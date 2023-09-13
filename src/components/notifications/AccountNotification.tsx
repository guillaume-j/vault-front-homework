import { AccountNotificationData } from '../../type/NotificationType';
import AccountCreatedImg from '../../assets/account_created.png';

interface AccountNotificationProps {
  data: AccountNotificationData;
}

export default function AccountNotification(props: AccountNotificationProps) {
  const { data } = props;
  return (
    <div className="border flex flex-row bg-[#d3d3d32e] m-[10px] p-[10px]">
      <img className="w-[20px] h-[20px]" src={AccountCreatedImg} alt="Green Dot" />
      <div className="w-[5%]" />
      <p>{`${data.currency} account ${data.name} created`}</p>
    </div>
  );
}
