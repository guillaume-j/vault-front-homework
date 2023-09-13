import { AccountNotificationData } from '../../type/NotificationType';
import AccountCreatedImg from '../../assets/account_created.png';

interface AccountNotificationProps {
  data: AccountNotificationData;
}

export default function AccountNotification(props: AccountNotificationProps) {
  const { data } = props;
  return (
    <div className="border flex flex-row" style={{ margin: 10, padding: 10 }}>
      <img src={AccountCreatedImg} alt="Green Dot" style={{ width: 20, height: 20 }} />
      <div style={{ width: '5%' }} />
      <p>{`${data.currency} Account ${data.name} created`}</p>
    </div>
  );
}
