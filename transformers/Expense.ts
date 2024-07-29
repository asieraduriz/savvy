import { Dates } from "@/datastructures";
import { ExpenseToAdd, ExpenseBase, OneTimeExpense } from "@/types";
import { randomUUID } from "expo-crypto";

export const toOneTimeExpense = (expenseToAdd: ExpenseToAdd): ExpenseBase & OneTimeExpense => {
  const { title, amount, when, category, categoryColor, categoryIcon } = expenseToAdd;

  return {
    type: "onetime",
    // Shared properties
    title,
    amount,
    when,
    category: {
      name: category,
      color: categoryColor,
      iconName: categoryIcon,
    },
    // New properties
    created: Dates.Now(),
    id: randomUUID(),
  };
};
