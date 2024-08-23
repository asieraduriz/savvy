import { toOneTimeExpense } from "./Expense";
import { toSubscription, toSubscriptionExpense } from "./Subscription";

export const Transformers = {
  toOneTimeExpense: toOneTimeExpense,
  toSubscription: toSubscription,
  toSubscriptionExpense: toSubscriptionExpense,
};
