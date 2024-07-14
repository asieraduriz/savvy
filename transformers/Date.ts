import { format } from "date-fns";

const DateFormats = {
  full: "MMM do yyyy",
  ymd: "yyyy-MM-dd",
};

export const toFormattedDate = (
  date: Date | number,
  formatStr: keyof typeof DateFormats = "full"
): string =>
  format(date instanceof Date ? date : new Date(date), DateFormats[formatStr]);

const toMonthFormats = {
  short: "MMM",
  long: "MMMM",
};
export const toMonth = (
  date: Date,
  formatStr: keyof typeof toMonthFormats = "short"
) => format(date, toMonthFormats[formatStr]);
