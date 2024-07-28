import { Dates } from "@/datastructures";
import { ExpenseToAdd, Expense } from "@/types";
import { randomUUID } from "expo-crypto";

export const toExpense = (expenseToAdd: ExpenseToAdd): Expense => {
  const { title, amount, when } = expenseToAdd;
  const newExpenseFields = {
    created: Dates.Now(),
    id: randomUUID(),
    category: {
      name: expenseToAdd.category,
      color: expenseToAdd.categoryColor,
      iconName: expenseToAdd.categoryIcon
    }
  };

  const singleExpense: Expense = {
    title, amount, when,
    ...newExpenseFields,
  };

  return singleExpense;
};
