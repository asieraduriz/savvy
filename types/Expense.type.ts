export type ExpenseBase = {
    id: string;
    amount: number;
    category: string;
    title: string;
    created: Date;
};

export type OneTimeExpenseBase = {
    when: Date;
};

export type Expense = ExpenseBase & OneTimeExpenseBase;
