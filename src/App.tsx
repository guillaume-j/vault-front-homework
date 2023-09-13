import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import TextInput from './components/TextInput';
import AccountNotification from './components/notifications/AccountNotification';
import TransactionNotification from './components/notifications/TransactionNotification';
import { AccountNotificationData, TransactionNotificationData } from './type/NotificationType';

import 'react-loading-skeleton/dist/skeleton.css';

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

const NO_MATCH_STRING = 'Aucun résultat trouvé pour votre recherche.';
const ERROR_STRING = 'Une erreur est survenue. Veuillez tenter une nouvelle recherche.';

function App() {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState<null | PossibleNotifType[]>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const effect = async () => {
      setLoading(true);
      setResults(null);
      setError(false);

      try {
        const res = await fetch(`${API}/search?q=${searchText}`);
        const data = await res.json();
        setResults(data);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    };
    effect();
  }, [searchText, setLoading, setResults]);

  return (
    <div>
      <TextInput value={searchText} onChange={setSearchText} placeholder="Type to filter events" />
      <div className="h-[100px]" />
      {isLoading ? (
        <Skeleton className="h-[45px]" count={5} />
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
          {results !== null && results?.length === 0 && <p>{NO_MATCH_STRING}</p>}
          {error === true && <p>{ERROR_STRING}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
