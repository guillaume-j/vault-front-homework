import { useEffect, useState } from 'react';
import TextInput from './components/TextInput';

const API = 'http://localhost:5000';

interface TransactionNotificationData {
  amout: number;
  from: string;
  id: number;
  to: string;
  unit: string;
}

interface AccountNotificationData {
  currency: string;
  id: number;
  name: string;
}

type NotifData = {
  TRANSACTION_SEND: TransactionNotificationData;
  TRANSACTION_RECEIVED: TransactionNotificationData;
  ACCOUNT_CREATED: AccountNotificationData;
};

type NotifType = 'TRANSACTION_SEND' | 'TRANSACTION_RECEIVED' | 'ACCOUNT_CREATED';

type Notif<T extends NotifType> = {
  id: string;
  type: T;
  data: NotifData[T];
};

type PossibleNotifType = Notif<'TRANSACTION_SEND' | 'TRANSACTION_RECEIVED'> | Notif<'ACCOUNT_CREATED'>;

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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {results?.map((r) => {
            if (r.type === 'ACCOUNT_CREATED') {
              const data = r.data as AccountNotificationData;
              return (
                <div className="border flex flex-row place-content-around" key={r.id}>
                  <p>{data.name}</p>
                  <p>{data.currency}</p>
                  <p>{data.id}</p>
                </div>
              );
            }
            const data = r.data as TransactionNotificationData;
            return (
              <div className="border flex flex-row place-content-around" key={r.id}>
                <p>{data.amout}</p>
                <p>{data.from}</p>
                <p>{data.to}</p>
                <p>{data.unit}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
