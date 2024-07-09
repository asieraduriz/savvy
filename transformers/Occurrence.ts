import { GroupedOccurrence, SubscriptionExpense, Expense, SubscriptionExpenseFrequency } from "@/types";
import { Occurrence, RecurrentOccurrence, SingleOccurrence } from "@/types";
import { addDays, addMonths, addWeeks, addYears, getTime, isBefore, startOfDay } from "date-fns";

const occurrenceDatesIn = (expense: SubscriptionExpense): Date[] => {
    const now = new Date();
    const { startDate, every, frequency } = expense;
    const repeatedDates: Date[] = [];
    let currentDate = startDate;

    while (isBefore(currentDate, now)) {
        repeatedDates.push(currentDate);
        switch (frequency) {
            case SubscriptionExpenseFrequency.days:
                currentDate = addDays(currentDate, every);
                break;
            case SubscriptionExpenseFrequency.weeks:
                currentDate = addWeeks(currentDate, every);
                break;
            case SubscriptionExpenseFrequency.months:
                currentDate = addMonths(currentDate, every);
                break;
            case SubscriptionExpenseFrequency.years:
                currentDate = addYears(currentDate, every);
                break;
            default:
                throw new Error('Invalid unit provided');
        }
    }

    return repeatedDates;
}

export const toOccurrence = (expense: Expense): Occurrence[] => {
    if (expense.type === 'onetime') {
        const { id, amount, category, title, type, when } = expense;
        const singleOccurrence: SingleOccurrence = {
            id, amount, category, title, type, when
        }

        return [singleOccurrence];
    }

    const { id, amount, category, title, type, every, frequency } = expense;
    const occurrences: RecurrentOccurrence[] = occurrenceDatesIn(expense).map((when) =>
        ({ id, amount, category, title, type, when, every, frequency })
    );

    return occurrences;
}

export const toOccurrences = (expenses: Expense[]) => expenses.flatMap(toOccurrence);

export const toGroupedByDateOccurences = (occurrences: Occurrence[]): GroupedOccurrence[] => {
    occurrences.sort((a, b) => b.when.getTime() - a.when.getTime());

    const groups: GroupedOccurrence[] = [];
    let currentGroup: GroupedOccurrence | null = null;

    for (const occurrence of occurrences) {
        const when = getTime(startOfDay(occurrence.when));

        if (!currentGroup || currentGroup.when !== when) {
            if (currentGroup) {
                groups.push(currentGroup);
            }
            currentGroup = { when, occurrences: [] };
        }

        currentGroup.occurrences.push(occurrence);
    }

    if (currentGroup) {
        groups.push(currentGroup);
    }

    return groups;
}
