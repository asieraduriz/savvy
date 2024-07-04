import {
  BaseTransaction,
  RecurrentBaseTransaction,
  SingleBaseTransaction,
} from "./Transaction.type";

export type UnifiedAddTransaction = Pick<
  BaseTransaction,
  "title" | "amount" | "category" | "currency" | "description"
> &
  SingleBaseTransaction &
  RecurrentBaseTransaction;
