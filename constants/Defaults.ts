import { RecurrentTransactionFrequency, UnifiedAddTransaction } from "@/types";
import { randomUUID } from "expo-crypto";

const transactionForm: UnifiedAddTransaction = {
  id: randomUUID(),
  amount: 0,
  currency: "€",
  title: "",
  category: "",
  every: 1,
  frequency: RecurrentTransactionFrequency.days,
  startDate: new Date(),
  when: new Date(),
};

export const Defaults = {
  TransactionForm: transactionForm,
};
