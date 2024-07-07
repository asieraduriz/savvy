import { BaseTransaction, RecurrentBaseTransaction, SingleBaseTransaction } from "./Transaction.type";

type BaseOccurrence = Pick<BaseTransaction, "id" | "amount" | 'currency' | "category" | "title"> & {
    when: Date;
};

type SingleBaseOccurrence = Pick<SingleBaseTransaction, "type">;

type RecurrentBaseOccurrence = Pick<RecurrentBaseTransaction, "every" | "frequency" | "type">;

export type SingleOccurrence = BaseOccurrence & SingleBaseOccurrence;
export type RecurrentOccurrence = BaseOccurrence & RecurrentBaseOccurrence;
export type Occurrence = BaseOccurrence & (SingleBaseOccurrence | RecurrentBaseOccurrence);
export type GroupedOccurrence = { when: number; occurrences: Occurrence[] };