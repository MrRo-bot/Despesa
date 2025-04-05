export interface TransactionObjectType {
  __typename: string;
  _id: string;
  account: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  location: string;
  paymentType: string;
}

export interface InvestmentObjectType {
  __typename: string;
  _id: string;
  account: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  location: string;
  paymentType: string;
}
