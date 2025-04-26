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

export interface TransactionFormType {
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

export interface BalancesType {
  income: number;
  expense: number;
  saving: number;
  investment: number;
}
