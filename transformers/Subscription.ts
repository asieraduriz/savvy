import { Dates } from "@/datastructures";
import { Expense, ExpenseToAdd, Subscription, SubscriptionStatus } from "@/types";
import { randomUUID } from "expo-crypto";


export const toSubscription = (expenseToAdd: ExpenseToAdd): Subscription => {
    const { title, amount, when, category, categoryColor, categoryIcon, every, interval } = expenseToAdd;

    return {
        // Shared properties
        title: title!,
        amount: amount!,
        start: when,
        category: {
            name: category!,
            color: categoryColor!,
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

export const toSubscriptionExpense = (expenseToAdd: ExpenseToAdd, date: Date, subscriptionId: Subscription["id"]): Expense => {
    const { title, amount, category, categoryColor, categoryIcon } = expenseToAdd;

    return {
        type: "subscription",
        // Shared properties
        title: title!,
        amount: amount!,
        when: date,
        category: {
            name: category!,
            color: categoryColor!,
            iconName: categoryIcon,
        },
        // New properties
        created: Dates.Now(),
        id: randomUUID(),
        subscriptionId
    };
}