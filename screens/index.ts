import { AddExpenseScreen } from "./Expenses/Add";
import { EditExpenseScreen } from "./Expenses/EditExpense";
import { EditSubscriptionScreen } from "./Expenses/EditSubscription";
import { ExpensesScreen } from "./Expenses/View";
import { DateFilterScreen } from "./Expenses/View/DateFilter";
import { FilterScreen } from "./Expenses/View/Filter";
import { HomeScreen } from "./Home";
import { GoalsScreen } from "./Goals";
import { AddGoalScreen } from "./Goals/Add";

export const Screens = {
  Expenses: ExpensesScreen,
  Filter: FilterScreen,
  DateFilterScreen: DateFilterScreen,
  AddExpense: AddExpenseScreen,
  EditExpense: EditExpenseScreen,
  EditSubscription: EditSubscriptionScreen,
  Home: HomeScreen,
  Goals: GoalsScreen,
  AddGoal: AddGoalScreen
};
