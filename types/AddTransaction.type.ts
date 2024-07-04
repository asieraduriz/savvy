import {
  BaseTransaction,
  RecurrentBaseTransaction,
  SingleBaseTransaction,
} from "./Transaction.type";

export type UnifiedAddTransaction = Omit<BaseTransaction, "created"> &
  SingleBaseTransaction &
  RecurrentBaseTransaction;
