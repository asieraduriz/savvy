import {
  Expense,
  ExpenseToAdd,
  EntriesFilter,
} from "@/types";
import { subDays } from "date-fns";
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
  created: subDays(today, 13),
  when: subDays(today, 13),
};

const starterSecondCoffee: Expense = {
  id: randomUUID(),
  amount: 7,
  title: "Coffee",
  category: "Cafe",
  created: subDays(today, 7),
  when: subDays(today, 6),
};

const starterGroceriesFirst: Expense = {
  id: randomUUID(),
  amount: 87,
  title: "Glories",
  category: "Grocieres",
  created: subDays(today, 7),
  when: subDays(today, 6),
};

const starterGroceriesSecond: Expense = {
  id: randomUUID(),
  amount: 87,
  title: "Glories",
  category: "Grocieres",
  created: subDays(today, 4),
  when: subDays(today, 4),
};

const starterFilter: EntriesFilter = {
  start: undefined,
  end: undefined,
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
