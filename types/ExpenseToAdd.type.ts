import { Category, ExpenseBase, OneTimeExpense, SubscriptionExpense } from "./Expense.type";
import { Subscription } from "./Subscription.type";

export type ExpenseToAdd = {
    title: ExpenseBase["title"];
    amount: ExpenseBase["amount"];
    category: Category["name"];
    categoryIcon: Category["iconName"];
    categoryColor: Category["color"];
    type: OneTimeExpense["type"] | SubscriptionExpense["type"]
    when: OneTimeExpense["when"] | SubscriptionExpense["when"]
    every: Subscription["every"];
    interval: Subscription["interval"];
};
