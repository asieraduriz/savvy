import { Dates } from "@/datastructures";
import { ExpenseToAdd, ExpenseBase, OneTimeExpense } from "@/types";
import { randomUUID } from "expo-crypto";

export const toOneTimeExpense = (expenseToAdd: ExpenseToAdd): ExpenseBase & OneTimeExpense => {
  const { title, amount, when, category, categoryColor, categoryIcon } = expenseToAdd;

  const sharedFields = {
    title,
    amount,
    when,
    category: {
      name: category,
      color: categoryColor,
      iconName: categoryIcon,
    },
  }

  const newFields = {
    created: Dates.Now(),
    id: randomUUID(),
  };

  return {
    type: "onetime",
    ...sharedFields,
    ...newFields,
  };

};
