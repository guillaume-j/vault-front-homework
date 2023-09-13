import { useEffect, useState } from 'react';
import TextInput from './components/TextInput';
import TransactionNotification from './components/notifications/TransactionNotification';
import { AccountNotificationData, TransactionNotificationData } from './type/NotificationType';
import AccountNotification from './components/notifications/AccountNotification';

const API = 'http://localhost:5000';

type NotifData = {
  TRANSACTION_SENT: TransactionNotificationData;
  TRANSACTION_RECEIVED: TransactionNotificationData;
  ACCOUNT_CREATED: AccountNotificationData;
};

type NotifType = 'TRANSACTION_SENT' | 'TRANSACTION_RECEIVED' | 'ACCOUNT_CREATED';

type Notif<T extends NotifType> = {
  id: string;
  type: T;
  data: NotifData[T];
};

type PossibleNotifType = Notif<'TRANSACTION_SENT' | 'TRANSACTION_RECEIVED'> | Notif<'ACCOUNT_CREATED'>;

function App() {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setLoading] = useState(false);
  // eslint-disable-next-line no-spaced-func
  const [results, setResults] = useState<null | PossibleNotifType[]>(null);

  useEffect(() => {
    const effect = async () => {
      setLoading(true);

      try {
        const res = await fetch(`${API}/search?q=${searchText}`);
        const data = await res.json();
        setResults(data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    effect();
  }, [searchText, setLoading, setResults]);

  return (
    <div>
      <TextInput value={searchText} onChange={setSearchText} placeholder="Type to filter events" />
      <div style={{ height: '100px' }} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {results?.map((r) => {
            if (r.type === 'ACCOUNT_CREATED') {
              const data = r.data as AccountNotificationData;
              return (
                <AccountNotification data={data} key={r.id} />
              );
            }
            const data = r.data as TransactionNotificationData;
            return (
              <TransactionNotification data={data} type={r.type} key={r.id} />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
