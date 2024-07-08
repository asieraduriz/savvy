import {
  Expense,
  ExpenseToAdd,
  OccurrencesFilter,
  SubscriptionExpenseFrequency,
} from "@/types";
import { subDays } from "date-fns";
import { randomUUID } from "expo-crypto";

const today = new Date();

const addExpenseFormStarter: ExpenseToAdd = {
  amount: 0,
  currency: "€",
  title: "",
  category: "",
  every: 1,
  frequency: SubscriptionExpenseFrequency.days,
  startDate: new Date(),
  when: new Date(),
  type: "onetime",
};

const starterWeeklyTennis: Expense = {
  id: randomUUID(),
  amount: 22,
  currency: "€",
  title: "Tennis",
  category: "Sport",
  created: subDays(today, 17),
  startDate: subDays(today, 22),
  every: 1,
  frequency: SubscriptionExpenseFrequency.weeks,
  type: "subscription",
};

const starterFirstCoffee: Expense = {
  type: 'onetime',
  id: randomUUID(),
  amount: 5,
  currency: '€',
  title: 'Tennesee',
  category: 'Cafe',
  created: subDays(today, 13),
  when: subDays(today, 13)
}

const starterSecondCoffee: Expense = {
  type: 'onetime',
  id: randomUUID(),
  amount: 7,
  currency: '€',
  title: 'Coffee',
  category: 'Cafe',
  created: subDays(today, 7),
  when: subDays(today, 6)
}

const starterGroceriesFirst: Expense = {
  type: 'onetime',
  id: randomUUID(),
  amount: 87,
  currency: '€',
  title: 'Glories',
  category: 'Grocieres',
  created: subDays(today, 7),
  when: subDays(today, 6)
}

const starterGroceriesSecond: Expense = {
  type: 'onetime',
  id: randomUUID(),
  amount: 87,
  currency: '€',
  title: 'Glories',
  category: 'Grocieres',
  created: subDays(today, 4),
  when: subDays(today, 4)
}

const starterFilter: OccurrencesFilter = {
  start: undefined,
  end: undefined,
}

export const Defaults = {
  AddExpenseForm: addExpenseFormStarter,
  Starters: [starterFirstCoffee, starterWeeklyTennis, starterSecondCoffee, starterGroceriesFirst, starterGroceriesSecond],
  Filter: starterFilter,
};
