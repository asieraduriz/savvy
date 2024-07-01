type BaseTransaction = {
    id: string;
    amount: number;
    currency: string;
    category: string;
    title: string;
    description?: string;
};

type SingleTransaction = {
    date: Date;
} & BaseTransaction;

type IntervalRecurrence = {
    every: number;
    frequency: "days" | "weeks" | "months" | "years";
    startDate: Date;
};

type FrequencyRecurrence = {
    frequency: "daily" | "weekly" | "monthly" | "yearly";
    startDate: Date;
};

type RecurrentTransaction = {
    recurrence: IntervalRecurrence | FrequencyRecurrence;
} & BaseTransaction;

export type Transaction = SingleTransaction | RecurrentTransaction;

type Group = {
    title: string;
    categories: BaseTransaction["category"][]
}