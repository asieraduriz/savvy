import { AddExpenseScreen } from "./Expenses/Add";
import { EditExpenseScreen } from "./Expenses/Edit";
import { ExpensesScreen } from "./Expenses/View";
import { DateFilterScreen } from "./Expenses/View/DateFilter";
import { FilterScreen } from "./Expenses/View/Filter";
import { HomeScreen } from "./Home";

export const Screens = {
  Expenses: ExpensesScreen,
  Filter: FilterScreen,
  DateFilterScreen: DateFilterScreen,
  AddExpense: AddExpenseScreen,
  EditExpense: EditExpenseScreen,
  Home: HomeScreen
};
