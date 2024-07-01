type BaseTransaction = {
    id: string;
    amount: number;
    currency: string;
    category: string;
    title: string;
    description?: string;
};

export type SingleTransaction = {
    date: Date;
} & BaseTransaction;

export enum TransactionRecurrenceTypes {
    interval = 'interval',
    frequency = 'frequency'
}

type IntervalRecurrence = {
    every: number;
    frequency: "days" | "weeks" | "months" | "years";
    startDate: Date;
    type: TransactionRecurrenceTypes.interval;
};

type FrequencyRecurrence = {
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    startDate: Date;
    type: TransactionRecurrenceTypes.frequency;
};

export type RecurrentTransaction = {
    recurrence: IntervalRecurrence | FrequencyRecurrence;
} & BaseTransaction;

export type Transaction = SingleTransaction | RecurrentTransaction;

type Group = {
    title: string;
    categories: BaseTransaction["category"][]
}