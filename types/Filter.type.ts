export enum Frequency {
  days = "days",
  weeks = "weeks",
  months = "months",
  years = "years",
};

type DateRangeFilter = {
  start?: Date;
  end?: Date;
};

export type EntriesFilter = DateRangeFilter;
