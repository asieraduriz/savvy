import { Category } from "./Category.type";
import { Subscription } from "./Subscription.type";

export type ExpenseBase = {
  id: string;
  amount: number;
  category: Category["name"];
  categoryIcon: Category["iconName"];
  categoryColor: Category["color"];
  title: string;
  created: Date;
};

export type OneTimeExpense = {
  type: "onetime";
  when: Date;
};

export type SubscriptionExpense = {
  type: "subscription";
  when: Date;
  subscriptionId: Subscription["id"];
};

export type Expense = ExpenseBase & (OneTimeExpense | SubscriptionExpense);

export type OneTimeExpenseToCreate = Omit<ExpenseBase, "id" | "created"> &
  OneTimeExpense;
export type SubscriptionExpenseToCreate = Omit<ExpenseBase, "id" | "created"> &
  SubscriptionExpense;
export type ExpenseToCreate =
  | OneTimeExpenseToCreate
  | SubscriptionExpenseToCreate;
