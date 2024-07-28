import { Dates } from "@/datastructures";
import { ExpenseToAdd, ExpensesFilter, Interval } from "@/types";

const Icons = ['coffee-to-go', 'shopping', 'beach', 'food-drumstick', 'glass-cocktail', 'airplane-takeoff', 'volleyball', 'book-open-page-variant', 'hiking']

const now = Dates.Now();
const addExpenseFormStarter: ExpenseToAdd = {
  amount: 0,
  title: "",
  category: "",
  categoryColor: "white",
  categoryIcon: Icons[0],
  when: now,
  type: 'onetime',
  every: 1,
  interval: Interval.weeks
};

const starterFilter: ExpensesFilter = {
  start: undefined,
  end: undefined,
  titleQuery: "",
};

export const Defaults = {
  AddExpenseForm: addExpenseFormStarter,
  Filter: starterFilter,
  Icons: Icons
};
