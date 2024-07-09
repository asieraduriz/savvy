import { toFormattedDate } from "./Date";
import { toExpense } from "./Expense";
import { toEntry, toEntries, toGroupedByDateEntries } from "./Entry";

export const Transformers = {
  toEntry: toEntry,
  toEntries: toEntries,
  toFormattedDate,
  toExpense,
  toGroupedByDateEntries: toGroupedByDateEntries,
};
