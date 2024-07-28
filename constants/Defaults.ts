import { Dates } from "@/datastructures";
import { ExpenseToAdd, ExpensesFilter } from "@/types";

const now = Dates.Now();
const addExpenseFormStarter: ExpenseToAdd = {
  amount: 0,
  title: "",
  category: "",
  categoryColor: "white",
  categoryIcon: "head-question",
  when: now,
};

const starterFilter: ExpensesFilter = {
  start: undefined,
  end: undefined,
  titleQuery: "",
};

export const Defaults = {
  AddExpenseForm: addExpenseFormStarter,
  Filter: starterFilter,
};
