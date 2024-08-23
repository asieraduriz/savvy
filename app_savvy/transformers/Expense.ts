import { OneTimeExpenseToCreate } from "@/types";
import { AddSpendingFormType } from "@/types/Forms/AddSpendingForm.type";

export const toOneTimeExpense = (
  expenseToAdd: AddSpendingFormType
): OneTimeExpenseToCreate => {
  const { title, amount, when, categoryId } =
    expenseToAdd;

  return {
    type: "onetime",
    title: title!,
    amount: amount!,
    when,
    categoryId: categoryId!,
  };
};
