export type ExpenseBase = {
    id: string;
    amount: number;
    currency: string;
    category: string;
    title: string;
    created: Date;
};

export type OneTimeExpenseBase = {
    when: Date;
    type: 'onetime'
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
    type: 'subscription';
};

export type OneTimeExpense = ExpenseBase & OneTimeExpenseBase;
export type SubscriptionExpense = ExpenseBase & SubscriptionExpenseBase;
export type Expense = ExpenseBase & (OneTimeExpenseBase | SubscriptionExpenseBase);

type Group = {
    title: string;
    categories: ExpenseBase["category"][];
};
