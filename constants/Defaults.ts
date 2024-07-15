import { Dates } from "@/datastructures";
import { Expense, ExpenseToAdd, ExpensesFilter } from "@/types";
import { randomUUID } from "expo-crypto";

const today = new Date();

const addExpenseFormStarter: ExpenseToAdd = {
  amount: 0,
  title: "",
  category: "",
  when: new Date(),
};

const starterFirstCoffee: Expense = {
  id: randomUUID(),
  amount: 5,
  title: "Tennesee",
  category: "Cafe",
  created: Dates.subDays(today, 13),
  when: Dates.subDays(today, 13),
};

const starterSecondCoffee: Expense = {
  id: randomUUID(),
  amount: 7,
  title: "Coffee",
  category: "Cafe",
  created: Dates.subDays(today, 7),
  when: Dates.subDays(today, 6),
};

const starterGroceriesFirst: Expense = {
  id: randomUUID(),
  amount: 87,
  title: "Glories",
  category: "Grocieres",
  created: Dates.subDays(today, 7),
  when: Dates.subDays(today, 6),
};

const starterGroceriesSecond: Expense = {
  id: randomUUID(),
  amount: 87,
  title: "Glories",
  category: "Grocieres",
  created: Dates.subDays(today, 4),
  when: Dates.subDays(today, 4),
};

const starterFilter: ExpensesFilter = {
  start: undefined,
  end: undefined,
  titleQuery: "",
};

export const Defaults = {
  AddExpenseForm: addExpenseFormStarter,
  Starters: [
    starterFirstCoffee,
    starterSecondCoffee,
    starterGroceriesFirst,
    starterGroceriesSecond,
  ],
  Filter: starterFilter,
};
