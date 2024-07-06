import {
  BaseTransaction,
  RecurrentBaseTransaction,
  SingleBaseTransaction,
} from "./Transaction.type";

export type UnifiedAddTransaction = Pick<
  BaseTransaction,
  "title" | "amount" | "category" | "currency"
> &
  Omit<SingleBaseTransaction, "type"> &
  Omit<RecurrentBaseTransaction, "type"> & { type: "single" | "recurrent" };
