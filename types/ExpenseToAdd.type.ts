import { ExpenseBase, ExpenseType, OneTimeExpenseBase, SubscriptionExpenseBase } from "./Expense.type";

export type ExpenseToAdd = Pick<
    ExpenseBase,
    "title" | "amount" | "category" | "currency"
> &
    Omit<OneTimeExpenseBase, "type"> &
    Omit<SubscriptionExpenseBase, "type"> & { type: ExpenseType };
