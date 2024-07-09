
type OneTimeExpenseType = 'onetime';
type SubscriptionExpenseType = 'subscription';

export type ExpenseType = OneTimeExpenseType | SubscriptionExpenseType;

export type ExpenseBase = {
    id: string;
    amount: number;
    category: string;
    title: string;
    created: Date;
};

export type OneTimeExpenseBase = {
    when: Date;
    type: OneTimeExpenseType
};

export enum SubscriptionExpenseFrequency {
    days = "days",
    weeks = "weeks",
    months = "months",
    years = "years",
}

export type SubscriptionExpenseBase = {
    frequency: SubscriptionExpenseFrequency;
    every: number;
    startDate: Date;
    type: SubscriptionExpenseType;
};

export type OneTimeExpense = ExpenseBase & OneTimeExpenseBase;
export type SubscriptionExpense = ExpenseBase & SubscriptionExpenseBase;
export type Expense = ExpenseBase & (OneTimeExpenseBase | SubscriptionExpenseBase);

type Group = {
    title: string;
    categories: ExpenseBase["category"][];
};
