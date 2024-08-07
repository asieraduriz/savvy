import { ExpenseToAdd, OneTimeExpenseToCreate } from "@/types";

export const toOneTimeExpense = (expenseToAdd: ExpenseToAdd): OneTimeExpenseToCreate => {
  const { title, amount, when, category, categoryColor, categoryIcon } = expenseToAdd;

  return {
    type: "onetime",
    title: title!,
    amount: amount!,
    when,
    category: category!,
    categoryIcon: categoryIcon!,
    categoryColor: categoryColor!,
  };
};
