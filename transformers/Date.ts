import { format } from "date-fns";

const DateFormats = {
  full: "MMM do yyyy",
};

export const toFormattedDate = (
  date: Date | number,
  formatStr: keyof typeof DateFormats = "full"
): string =>
  format(date instanceof Date ? date : new Date(date), DateFormats[formatStr]);
