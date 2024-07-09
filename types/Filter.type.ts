export enum Frequencies {
  days = "days",
  weeks = "weeks",
  months = "months",
  years = "years",
};

export type SubscriptionExpenseBase = {
  frequency: Frequencies;
  every: number;
};

type DateRangeFilter = {
  start?: Date;
  end?: Date;
};

export type EntriesFilter = DateRangeFilter;
