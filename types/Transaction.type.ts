type BaseTransaction = {
  id: string;
  amount: number;
  currency: string;
  category: string;
  title: string;
  description?: string;
};

export type SingleTransaction = {
  date: Date;
} & BaseTransaction;

export enum RecurrentTransactionFrequency {
  days = "days",
  weeks = "weeks",
  months = "months",
  years = "years",
}

export type RecurrentTransaction = {
  frequency: RecurrentTransactionFrequency;
  every: number;
  startDate: Date;
} & BaseTransaction;

export type Transaction = SingleTransaction | RecurrentTransaction;

type Group = {
  title: string;
  categories: BaseTransaction["category"][];
};
