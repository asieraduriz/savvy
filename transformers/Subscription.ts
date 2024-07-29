import { Dates } from "@/datastructures";
import { ExpenseToAdd, Subscription, SubscriptionStatus } from "@/types";
import { randomUUID } from "expo-crypto";


export const toSubscription = (expenseToAdd: ExpenseToAdd): Subscription => {
    const { title, amount, when, category, categoryColor, categoryIcon, every, interval } = expenseToAdd;

    return {
        // Shared properties
        title,
        amount,
        start: when,
        category: {
            name: category,
            color: categoryColor,
            iconName: categoryIcon,
        },
        every,
        interval,
        // New properties
        created: Dates.Now(),
        id: randomUUID(),
        status: SubscriptionStatus.active,
        history: []
    };
}

export const toSubscriptionExpense = () => { }