import { useEffect, useState } from "react";
import TextInput from "./components/TextInput";

const API = "http://localhost:5000";

interface transactionNotificationData {
  amout: number;
  from: string;
  id: number;
  to: string;
  unit: any;



}

interface accountNotificationData {
  currency: string;
  id: number;



  name: string;
}

type NotifData = {
  TRANSACTION_SEND: transactionNotificationData;
  TRANSACTION_RECEIVED: transactionNotificationData;
  ACCOUNT_CREATED: accountNotificationData;
};

type NotifType = 'TRANSACTION_SEND' | 'TRANSACTION_RECEIVED' | 'ACCOUNT_CREATED';

type Notif<T extends NotifType> = {
  id: string;
  type: T;
  data: NotifData[T];
};

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState<null | (Notif<'TRANSACTION_SEND' | 'TRANSACTION_RECEIVED'> | Notif<'ACCOUNT_CREATED'>)[]>(null);

  useEffect(() => {
    const effect = async () => {
      setLoading(true);




                try {
        const res = await fetch(`${API}/search?q=${searchText}`);
        const data = await res.json();
        setResults(data);
      } catch (e) {
        console.log(e)
      }
      setLoading(false);
    };
    effect();
  }, [searchText, setLoading, setResults]);

  return (
    <div>
      <TextInput value={searchText} onChange={setSearchText} placeholder="Type to filter events" />
      {isLoading ? (
        <div>{"Loading..."}</div>
      ) : results ? (
        <div>
          {results.map((r) => {
            if (r.type === 'ACCOUNT_CREATED') {
              const data = r.data as accountNotificationData;
              return (
              <div className="border flex flex-row place-content-around">
                <p>{data.name}</p>
                <p>{data.currency}</p>
                <p>{data.id}</p>
              </div>
              )
            }
            // const data = r.data as transactionNotificationData;
             return (
            <div className="border border-dashed">{JSON.stringify(r)}</div>
            )
          })}
        </div>
      ) : null}
    </div>
  );
};

export default App;
