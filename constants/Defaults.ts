import {
  RecurrentTransactionFrequency,
  Transaction,
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
  type: "single",
};

const starterSingleTransaction: Transaction = {
  id: randomUUID(),
  amount: 1375.4,
  currency: "€",
  title: "Trip to Japan",
  category: "Life therapy",
  when: new Date("2024-07-01"),
  created: new Date("2024-07-03"),
  type: "single",
};

const starterRecurrentTransaction: Transaction = {
  id: randomUUID(),
  amount: 203.14,
  currency: "€",
  title: "Mental therapy",
  category: "Psychology",
  every: 3,
  frequency: RecurrentTransactionFrequency.weeks,
  startDate: new Date("2024-04-14"),
  created: new Date("2024-04-20"),
  type: "recurrent",
};

export const Defaults = {
  TransactionForm: transactionForm,
  Starters: [starterRecurrentTransaction, starterSingleTransaction],
};
