import { Dates } from "@/datastructures";
import { ExpenseToAdd, Expense } from "@/types";
import { randomUUID } from "expo-crypto";

export const toExpense = (expenseToAdd: ExpenseToAdd): Expense => {
  const newExpenseFields = {
    created: Dates.Today(),

    id: randomUUID(),
  };

  const singleExpense: Expense = {
    ...expenseToAdd,
    ...newExpenseFields,
  };

  return singleExpense;
};
