import { TransactionNotificationData } from '../../type/NotificationType';
import GreenDotSvg from '../../assets/green_dot.png';
import RedDotSvg from '../../assets/red_dot.png';

interface TransactionNotificationProps {
  data: TransactionNotificationData;
  type: 'TRANSACTION_SENT' | 'TRANSACTION_RECEIVED'
}

interface DataMappingObject {
  svgComponent: string;
  wordingAction: 'Sent' | 'Received';
  wordingDirection: 'from' | 'to'
}

interface DataMapping {
  TRANSACTION_SENT: DataMappingObject;
  TRANSACTION_RECEIVED: DataMappingObject;

}

const dataMapping: DataMapping = {
  TRANSACTION_SENT: { svgComponent: RedDotSvg, wordingAction: 'Sent', wordingDirection: 'to' },
  TRANSACTION_RECEIVED: { svgComponent: GreenDotSvg, wordingAction: 'Received', wordingDirection: 'from' },
};

export default function TransactionNotification(props: TransactionNotificationProps) {
  const { data, type } = props;
  return (
    <div className="border flex flex-row" style={{ margin: 10, padding: 10 }}>
      <img src={dataMapping[type].svgComponent} alt="Green Dot" style={{ width: 20, height: 20 }} />
      <div style={{ width: '5%' }} />
      <p style={{ width: '20%' }}>{dataMapping[type].wordingAction}</p>
      <p style={{ width: '20%' }}>{`${data.amount} ${data.unit}`}</p>
      <p style={{ width: '20%' }}>{dataMapping[type].wordingDirection}</p>
      <p>{data[`${dataMapping[type].wordingDirection}`]}</p>
    </div>
  );
}
