import { Dates } from "@/datastructures";
import { ExpenseToAdd, Expense } from "@/types";
import { randomUUID } from "expo-crypto";

export const toOneTimeExpense = (expenseToAdd: ExpenseToAdd): Expense => {
  const { title, amount, when, category, categoryColor, categoryIcon } = expenseToAdd;

  return {
    type: "onetime",
    // Shared properties
    title: title!,
    amount: amount!,
    when,
    category: category!,
    categoryIcon: categoryIcon!,
    categoryColor: categoryColor!,
    // New properties
    created: Dates.Now(),
    id: randomUUID(),
  };
};
