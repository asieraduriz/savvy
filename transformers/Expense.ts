import { ExpenseToAdd, Expense, OneTimeExpense, SubscriptionExpense } from "@/types";
import { randomUUID } from "expo-crypto";

export const toExpense = (expenseToAdd: ExpenseToAdd): Expense => {
    const isSubscription = expenseToAdd.type === "subscription";

    const newExpenseFields = {
        created: new Date(),
        id: randomUUID(),
    };

    const { frequency, every, startDate, when, ...sharedExpenseFields } = expenseToAdd;
    const subscriptionExpense: SubscriptionExpense = {
        frequency,
        every,
        startDate,
        ...sharedExpenseFields,
        ...newExpenseFields,
        type: "subscription",
    };

    const singleExpense: OneTimeExpense = {
        when,
        ...sharedExpenseFields,
        ...newExpenseFields,
        type: "onetime",
    };

    return isSubscription ? subscriptionExpense : singleExpense;
};
