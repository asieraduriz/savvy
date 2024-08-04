import { Expense, ExpenseBase } from "./Expense.type";
import { Subscription } from "./Subscription.type";

export type ExpenseToAdd = {
  title?: ExpenseBase["title"];
  amount?: ExpenseBase["amount"];
  category?: Expense["category"];
  categoryIcon?: Expense["categoryIcon"];
  categoryColor?: Expense["categoryColor"];
  type: Expense["type"];
  when: Expense["when"];
  every: Subscription["every"];
  interval: Subscription["interval"];
  pastSubscriptionChargeDates?: Expense["when"][]
};
