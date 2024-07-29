import { toOneTimeExpense } from "./Expense";
import { toSubscription, toSubscriptionExpense } from "./Subscription";

export const Transformers = {
  toExpense: toOneTimeExpense,
  toSubscription: toSubscription,
  toSubscriptionExpense: toSubscriptionExpense
};
