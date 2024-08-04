import { Dates } from "@/datastructures";
import { ExpenseToAdd, ExpensesFilter, GoalToAdd, Interval } from "@/types";

const Icons = ['coffee-to-go', 'shopping', 'beach', 'food-drumstick', 'glass-cocktail', 'airplane-takeoff', 'volleyball', 'book-open-page-variant', 'hiking']

const now = Dates.Now();
const addExpenseFormStarter: ExpenseToAdd = {
  categoryColor: "white",
  categoryIcon: Icons[0],
  when: now,
  type: 'onetime',
  every: 1,
  interval: Interval.weeks
};

const addGoalFormStarter: GoalToAdd = {
  type: 'title-goal',
  limit: 0,
  title: '',
  link: ''
}

const starterFilter: ExpensesFilter = {
  start: undefined,
  end: undefined,
  titleQuery: "",
};

export const Defaults = {
  AddExpenseForm: addExpenseFormStarter,
  AddGoalForm: addGoalFormStarter,
  Filter: starterFilter,
  Icons: Icons
};
