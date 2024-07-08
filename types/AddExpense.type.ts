import { ExpenseBase, OneTimeExpenseBase, SubscriptionExpenseBase } from "./Expense.type";

export type AddExpense = Pick<
    ExpenseBase,
    "title" | "amount" | "category" | "currency"
> &
    Omit<OneTimeExpenseBase, "type"> &
    Omit<SubscriptionExpenseBase, "type"> & { type: "single" | "recurrent" };
