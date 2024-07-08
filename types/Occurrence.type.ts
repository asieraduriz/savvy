import { ExpenseBase, OneTimeExpenseBase, SubscriptionExpenseBase } from "./Expense.type";

type BaseOccurrence = Pick<ExpenseBase, "id" | "amount" | 'currency' | "category" | "title"> & {
    when: Date;
};

type SingleBaseOccurrence = Pick<OneTimeExpenseBase, "type">;

type RecurrentBaseOccurrence = Pick<SubscriptionExpenseBase, "every" | "frequency" | "type">;

export type SingleOccurrence = BaseOccurrence & SingleBaseOccurrence;
export type RecurrentOccurrence = BaseOccurrence & RecurrentBaseOccurrence;
export type Occurrence = BaseOccurrence & (SingleBaseOccurrence | RecurrentBaseOccurrence);
export type GroupedOccurrence = { when: number; occurrences: Occurrence[] };