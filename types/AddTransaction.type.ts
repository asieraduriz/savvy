import { BaseTransaction, RecurrentBaseTransaction, SingleBaseTransaction } from "./Transaction.type";

export type UnifiedAddTransaction = BaseTransaction & { otherCategory: string } & SingleBaseTransaction & RecurrentBaseTransaction;