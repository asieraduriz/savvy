export enum Frequency {
  days = "days",
  weeks = "weeks",
  months = "months",
  years = "years",
}

export type DateRange = {
  start: Date;
  end: Date;
};

type DateRangeFilter = Partial<DateRange>;

type TitleSearchFilter = {
  titleQuery: string;
};

export type ExpensesFilter = DateRangeFilter & TitleSearchFilter;
