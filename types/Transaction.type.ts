export type BaseTransaction = {
  id: string;
  amount: number;
  currency: string;
  category: string;
  title: string;
  description?: string;
  created: Date;
};

export type SingleBaseTransaction = { date: Date };
export type SingleTransaction = BaseTransaction & SingleBaseTransaction;

export enum RecurrentTransactionFrequency {
  days = "days",
  weeks = "weeks",
  months = "months",
  years = "years",
}

export type RecurrentBaseTransaction = {
  frequency: RecurrentTransactionFrequency;
  every: number;
  startDate: Date;
};
export type RecurrentTransaction = BaseTransaction & RecurrentBaseTransaction;

export type Transaction = SingleTransaction | RecurrentTransaction;

type Group = {
  title: string;
  categories: BaseTransaction["category"][];
};
