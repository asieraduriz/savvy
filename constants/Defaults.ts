import {
  RecurrentTransaction,
  RecurrentTransactionFrequency,
  SingleTransaction,
  UnifiedAddTransaction,
} from "@/types";
import { randomUUID } from "expo-crypto";

const transactionForm: UnifiedAddTransaction = {
  amount: 0,
  currency: "€",
  title: "",
  category: "",
  every: 1,
  frequency: RecurrentTransactionFrequency.days,
  startDate: new Date(),
  when: new Date(),
};

const starterSingleTransaction: SingleTransaction = {
  id: randomUUID(),
  amount: 1375.4,
  currency: "€",
  title: "Trip to Japan",
  category: "Life therapy",
  when: new Date("2024-07-01"),
  created: new Date("2024-07-03"),
};

const starterRecurrentTransaction: RecurrentTransaction = {
  id: randomUUID(),
  amount: 203.14,
  currency: "€",
  title: "Recurrent transaction",
  category: "Massage",
  every: 3,
  frequency: RecurrentTransactionFrequency.weeks,
  startDate: new Date("2024-04-14"),
  created: new Date("2024-04-20"),
};

export const Defaults = {
  TransactionForm: transactionForm,
  Starters: [starterRecurrentTransaction, starterSingleTransaction],
};
