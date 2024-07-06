import {
  RecurrentTransactionFrequency,
  Transaction,
  UnifiedAddTransaction,
} from "@/types";
import { subDays } from "date-fns";
import { randomUUID } from "expo-crypto";

const today = new Date();

const transactionForm: UnifiedAddTransaction = {
  amount: 0,
  currency: "€",
  title: "",
  category: "",
  every: 1,
  frequency: RecurrentTransactionFrequency.days,
  startDate: new Date(),
  when: new Date(),
  type: "single",
};

const starterWeeklyTennis: Transaction = {
  id: randomUUID(),
  amount: 22,
  currency: "€",
  title: "Tennis",
  category: "Sport",
  created: subDays(today, 17),
  startDate: subDays(today, 22),
  every: 1,
  frequency: RecurrentTransactionFrequency.weeks,
  type: "recurrent",
};

const starterFirstCoffee: Transaction = {
  type: 'single',
  id: randomUUID(),
  amount: 5,
  currency: '€',
  title: 'Coffee',
  category: 'Cafe',
  created: subDays(today, 13),
  when: subDays(today, 13)
}

const starterSecondCoffee: Transaction = {
  type: 'single',
  id: randomUUID(),
  amount: 7,
  currency: '€',
  title: 'Coffee',
  category: 'Cafe',
  created: subDays(today, 7),
  when: subDays(today, 6)
}

const starterGroceriesFirst: Transaction = {
  type: 'single',
  id: randomUUID(),
  amount: 87,
  currency: '€',
  title: 'Glories',
  category: 'Grocieres',
  created: subDays(today, 7),
  when: subDays(today, 6)
}

const starterGroceriesSecond: Transaction = {
  type: 'single',
  id: randomUUID(),
  amount: 87,
  currency: '€',
  title: 'Glories',
  category: 'Grocieres',
  created: subDays(today, 4),
  when: subDays(today, 4)
}

export const Defaults = {
  TransactionForm: transactionForm,
  Starters: [starterFirstCoffee, starterWeeklyTennis, starterSecondCoffee, starterGroceriesFirst, starterGroceriesSecond],
};
