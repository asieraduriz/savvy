import { ExpenseBase, OneTimeExpenseBase } from "./Expense.type";

export type ExpenseToAdd = Pick<ExpenseBase, "title" | "amount" | "category"> & OneTimeExpenseBase;