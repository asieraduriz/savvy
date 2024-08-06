import { toOneTimeExpense } from "./Expense";
import { toGoal } from "./Goal";
import { toSubscription, toSubscriptionExpense } from "./Subscription";

export const Transformers = {
  toOneTimeExpense: toOneTimeExpense,
  toSubscription: toSubscription,
  toSubscriptionExpense: toSubscriptionExpense,
  toGoal: toGoal
};
