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

export enum TransactionRecurrenceTypes {
  interval = "interval",
  frequency = "frequency",
}

export enum TimespanIntervalRecurrence {
  days = "days",
  weeks = "weeks",
  months = "months",
  years = "years",
}

export type IntervalRecurrence = {
  frequency: TimespanIntervalRecurrence;
  every: number;
  startDate: Date;
  type: TransactionRecurrenceTypes.interval;
};

export enum TimespanFrequencyRecurrence {
  daily = "daily",
  weekly = "weekly",
  monthly = "monthly",
  yearly = "yearly",
};

export type FrequencyRecurrence = {
  frequency: TimespanFrequencyRecurrence;
  startDate: Date;
  type: TransactionRecurrenceTypes.frequency;
};

export type RecurrentTransaction = {
  recurrence: IntervalRecurrence | FrequencyRecurrence;
} & BaseTransaction;

export type Transaction = SingleTransaction | RecurrentTransaction;

type Group = {
  title: string;
  categories: BaseTransaction["category"][];
};
