import { toOneTimeExpense } from "./Expense";
import { toSubscription } from "./Subscription";

export const Transformers = {
  toExpense: toOneTimeExpense,
  toSubscription: toSubscription,
};
