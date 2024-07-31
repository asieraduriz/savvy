import { Category } from "./Category.type";
import { Expense, ExpenseBase } from "./Expense.type";
import { Subscription } from "./Subscription.type";

export type ExpenseToAdd = {
  title: ExpenseBase["title"];
  amount: ExpenseBase["amount"];
  category: Category["name"];
  categoryIcon: Category["iconName"];
  categoryColor: Category["color"];
  type: Expense["type"];
  when: Expense["when"];
  every: Subscription["every"];
  interval: Subscription["interval"];
};
