import {
  Subscription,
  SubscriptionStatus,
  SubscriptionToCreate,
} from "@/types";
import { SubscriptionExpenseToCreate } from "@/types/Expenses/Expense.type";
import { AddSpendingFormType } from "@/types/Forms/AddSpendingForm.type";

export const toSubscription = (
  subscriptionToAdd: AddSpendingFormType
): SubscriptionToCreate => {
  const {
    title,
    amount,
    when,
    category,
    categoryColor,
    categoryIcon,
    every,
    interval,
  } = subscriptionToAdd;

  return {
    // Shared properties
    title: title!,
    amount: amount!,
    start: when,
    category: {
      name: category!,
      color: categoryColor!,
      iconName: categoryIcon,
    },
    every,
    interval,
    status: SubscriptionStatus.active,
    history: [],
  };
};

export const toSubscriptionExpense = (
  expenseToAdd: AddSpendingFormType,
  date: Date,
  subscriptionId: Subscription["id"]
): SubscriptionExpenseToCreate => {
  const { title, amount, category, categoryColor, categoryIcon } = expenseToAdd;

  return {
    type: "subscription",
    title: title!,
    amount: amount!,
    when: date,
    category: category!,
    categoryIcon: categoryIcon!,
    categoryColor: categoryColor!,
    subscriptionId,
  };
};
