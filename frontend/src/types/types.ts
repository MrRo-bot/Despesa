import { ChangeEventHandler, JSX } from "react";

export interface TransactionObjectType {
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

export interface SignInType {
  username: string;
  password: string;
}

export interface SignUpType {
  name: string;
  username: string;
  password: string;
  gender: string;
}

export interface CategoryType {
  category: string;
  total: number;
}

export interface AccCategoryType {
  account: string;
  total: number;
}

export interface PayCategoryType {
  paymentType: string;
  total: number;
}

export interface MonthWiseType {
  Month: string;
  Income: number;
  Savings: number;
  Expenses: number;
  Investments: number;
  EpochTime: number;
  Ratio: number;
}

export interface SelectType {
  selectValue?: string;
  change?: ChangeEventHandler<HTMLSelectElement> | undefined;
  title: string;
  icon: JSX.Element;
  options: string[];
}

export interface InputType {
  inputValue?: string | number;
  change?: ChangeEventHandler<HTMLInputElement> | undefined;
  title: string;
  type: string;
  placeHolder?: string;
  icon: JSX.Element;
}
