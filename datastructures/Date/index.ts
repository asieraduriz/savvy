const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24;

const toStart = [0, 0, 0, 0];
const toEnd = [23, 59, 59, 999];

export const At = (timestamp: number | string) =>
  new Date(
    Date.UTC(
      new Date(timestamp).getUTCFullYear(),
      new Date(timestamp).getUTCMonth(),
      new Date(timestamp).getUTCDate(),
      ...toStart
    )
  );

export const Now = () =>
  new Date(
    Date.UTC(
      new Date().getUTCFullYear(),
      new Date().getUTCMonth(),
      new Date().getUTCDate(),
      ...toStart
    )
  );

export const Tomorrow = () => {
  const now = Now();
  return addDays(now, 1);
};

export const startOfMonth = (date: Date) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));

export const endOfMonth = (date: Date) =>
  new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0, ...toEnd)
  );
export const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date.getTime());
  newDate.setUTCMonth(date.getUTCMonth() + months);
  return newDate;
};

export const subMonths = (date: Date, months: number): Date =>
  addMonths(date, -months);

export const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date.getTime());
  newDate.setUTCDate(newDate.getUTCDate() - days);
  return newDate;
};

export const subDays = (date: Date, days: number): Date => addDays(date, -days);

export const differenceInDays = (left: Date, right: Date): number => {
  const leftUtc = Date.UTC(
    left.getUTCFullYear(),
    left.getUTCMonth(),
    left.getUTCDate()
  );
  const rightUtc = Date.UTC(
    right.getUTCFullYear(),
    right.getUTCMonth(),
    right.getUTCDate()
  );
  return Math.floor((rightUtc - leftUtc) / MILLISECONDS_IN_A_DAY);
};

export const toFormat = (date: Date, format: "ymd" = "ymd") => {
  const year = date.getUTCFullYear().toString().padStart(4, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const toMonth = (date: Date): string => {
  const monthIndex = date.getMonth();
  return monthNames[monthIndex];
};

export const readable = (date: Date): string => date.toLocaleDateString();

export const isSameDay = (left: Date, right: Date): boolean =>
  left.getUTCFullYear() === right.getUTCFullYear() &&
  left.getUTCMonth() === right.getUTCMonth() &&
  left.getUTCDate() === right.getUTCDate();

export const isAfter = (laterDate: Date, earlierDate: Date): boolean =>
  laterDate.getTime() > earlierDate.getTime();
