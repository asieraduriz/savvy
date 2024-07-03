import { RecurrentTransaction, RecurrentTransactionFrequency, SingleTransaction } from "@/types";

const recurrentTransaction: RecurrentTransaction = {
    id: new Date().toISOString(),
    amount: 0,
    currency: '€',
    title: '',
    category: '',
    every: 1,
    frequency: RecurrentTransactionFrequency.days,
    startDate: new Date(),
};

const singleTransaction: SingleTransaction = {
    id: new Date().toISOString(),
    amount: 0,
    currency: '€',
    title: '',
    category: '',
    date: new Date(),
}

export const Defaults = {
    RecurrentTransaction: recurrentTransaction,
    SingleTransactionDate: singleTransaction,
}