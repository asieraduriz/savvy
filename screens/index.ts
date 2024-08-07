import { HomeScreen } from "./Home";
import { ExpensesScreen } from "./Expenses/View";
import { SubscriptionsScreen } from "./Subscriptions/View";
import { GoalsScreen } from "./Goals";
import { SettingsScreen } from "./Settings";

import { AddExpenseScreen } from "./Expenses/AddExpense";
import { AddSubscriptionScreen } from "./Subscriptions/AddSubscription";
import { AddGoalScreen } from "./Goals/Add";

import { EditExpenseScreen } from "./Expenses/EditExpense";
import { EditSubscriptionScreen } from "./Subscriptions/EditSubscription";
import { EditGoalScreen } from "./Goals/Edit";

import { DateFilterScreen } from "./Expenses/View/DateFilter";
import { FilterScreen } from "./Expenses/View/Filter";

export const Screens = {
  View: {
    Home: HomeScreen,
    Expenses: ExpensesScreen,
    Subscriptions: SubscriptionsScreen,
    Goals: GoalsScreen,
    Settings: SettingsScreen,
  },
  Add: {
    Expense: AddExpenseScreen,
    Subscription: AddSubscriptionScreen,
    Goal: AddGoalScreen
  },
  Edit: {
    Expense: EditExpenseScreen,
    Subscription: EditSubscriptionScreen,
    Goal: EditGoalScreen,
  },
  Filter: FilterScreen,
  DateFilterScreen: DateFilterScreen,
};

