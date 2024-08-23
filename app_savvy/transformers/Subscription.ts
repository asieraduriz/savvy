import {
  Subscription,
  SubscriptionExpenseToCreate,
  SubscriptionStatus,
  SubscriptionToCreate,
} from "@/types";
import { AddSpendingFormType } from "@/types/Forms/AddSpendingForm.type";

export const toSubscription = (
  subscriptionToAdd: AddSpendingFormType
): SubscriptionToCreate => {
  const {
    title,
    amount,
    when,
    categoryId,
    every,
    interval,
  } = subscriptionToAdd;

  return {
    // Shared properties
    title: title!,
    amount: amount!,
    start: when,
    categoryId: categoryId!,
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
  const { title, amount, categoryId } = expenseToAdd;

  return {
    type: "subscription",
    title: title!,
    amount: amount!,
    when: date,
    categoryId: categoryId!,
    subscriptionId,
  };
};
