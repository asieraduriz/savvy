import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Subscription } from "./Subscription.type";

export type Category = {
  name: string;
  iconName?: typeof MaterialCommunityIcons.defaultProps;
  color: string;
}

export type ExpenseBase = {
  id: string;
  amount: number;
  category: Category;
  title: string;
  created: Date;
};

export type OneTimeExpense = {
  type: 'onetime'
  when: Date;
};

export type SubscriptionExpense = {
  type: 'subscription';
  when: Date;
  subscriptionId: Subscription["id"];
}


export type Expense = ExpenseBase & (OneTimeExpense | SubscriptionExpense);
