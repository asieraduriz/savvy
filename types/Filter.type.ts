export enum Frequency {
  days = "days",
  weeks = "weeks",
  months = "months",
  years = "years",
}

type DateRangeFilter = {
  start?: Date;
  end?: Date;
};

type TitleSearchFilter = {
  titleQuery: string;
};

export type ExpensesFilter = DateRangeFilter & TitleSearchFilter;
