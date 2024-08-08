import { OneTimeExpenseToCreate } from "@/types";
import { AddSpendingFormType } from "@/types/Forms/AddSpendingForm.type";

export const toOneTimeExpense = (
  expenseToAdd: AddSpendingFormType
): OneTimeExpenseToCreate => {
  const { title, amount, when, category, categoryColor, categoryIcon } =
    expenseToAdd;

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
