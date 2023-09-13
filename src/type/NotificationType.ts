export interface TransactionNotificationData {
  amount: number;
  from: string;
  id: number;
  to: string;
  unit: string;
}

export interface AccountNotificationData {
  currency: string;
  id: number;
  name: string;
}
