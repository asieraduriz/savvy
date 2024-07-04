import { RecurrentTransactionFrequency, UnifiedAddTransaction } from "@/types";

const transactionForm: UnifiedAddTransaction = {
  id: new Date().toISOString(),
  amount: 0,
  currency: "€",
  title: "",
  category: "",
  otherCategory: "",
  every: 1,
  frequency: RecurrentTransactionFrequency.days,
  startDate: new Date(),
  date: new Date(),
  created: new Date(),
};

export const Defaults = {
  TransactionForm: transactionForm,
};
