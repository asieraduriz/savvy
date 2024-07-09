import { ExpenseToAdd, Expense } from "@/types";
import { randomUUID } from "expo-crypto";

export const toExpense = (expenseToAdd: ExpenseToAdd): Expense => {
    const newExpenseFields = {
        created: new Date(),
        id: randomUUID(),
    };

    const singleExpense: Expense = {
        ...expenseToAdd,
        ...newExpenseFields,
    };

    return singleExpense;
};
