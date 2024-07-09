import {
  ExpenseBase,
  OneTimeExpenseBase,
  SubscriptionExpenseBase,
} from "./Expense.type";

type EntryBase = Pick<ExpenseBase, "id" | "amount" | "category" | "title"> & {
  when: Date;
};

type OneTimeEntryBase = Pick<OneTimeExpenseBase, "type">;

type SubscriptionEntryBase = Pick<
  SubscriptionExpenseBase,
  "every" | "frequency" | "type"
>;

export type OneTimeEntry = EntryBase & OneTimeEntryBase;
export type SubscriptionEntry = EntryBase & SubscriptionEntryBase;
export type Entry = EntryBase & (OneTimeEntryBase | SubscriptionEntryBase);
export type GroupedEntry = { when: number; entries: Entry[] };
