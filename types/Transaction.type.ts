export type BaseTransaction = {
  id: string;
  amount: number;
  currency: string;
  category: string;
  title: string;
  created: Date;
};

export type SingleBaseTransaction = {
  when: Date;
  type: 'single';
};

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
  type: 'recurrent';
};

export type SingleTransaction = BaseTransaction & SingleBaseTransaction;
export type RecurrentTransaction = BaseTransaction & RecurrentBaseTransaction;
export type Transaction = BaseTransaction & (SingleBaseTransaction | RecurrentBaseTransaction);

type Group = {
  title: string;
  categories: BaseTransaction["category"][];
};
