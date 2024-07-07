import { GroupedOccurrence, RecurrentTransaction, RecurrentTransactionFrequency, Transaction } from "@/types";
import { Occurrence, RecurrentOccurrence, SingleOccurrence } from "@/types";
import { addDays, addMonths, addWeeks, addYears, getTime, isBefore, startOfDay } from "date-fns";

const occurrenceDatesIn = (transaction: RecurrentTransaction): Date[] => {
    const now = new Date();
    const { startDate, every, frequency } = transaction;
    const repeatedDates: Date[] = [];
    let currentDate = startDate;

    while (isBefore(currentDate, now)) {
        repeatedDates.push(currentDate);
        switch (frequency) {
            case RecurrentTransactionFrequency.days:
                currentDate = addDays(currentDate, every);
                break;
            case RecurrentTransactionFrequency.weeks:
                currentDate = addWeeks(currentDate, every);
                break;
            case RecurrentTransactionFrequency.months:
                currentDate = addMonths(currentDate, every);
                break;
            case RecurrentTransactionFrequency.years:
                currentDate = addYears(currentDate, every);
                break;
            default:
                throw new Error('Invalid unit provided');
        }
    }

    return repeatedDates;
}

export const toOccurrence = (transaction: Transaction): Occurrence[] => {
    if (transaction.type === 'single') {
        const { id, amount, category, title, currency, type, when } = transaction;
        const singleOccurrence: SingleOccurrence = {
            id, amount, category, title, currency, type, when
        }

        return [singleOccurrence];
    }

    const { id, amount, category, title, currency, type, every, frequency } = transaction;
    const occurrences: RecurrentOccurrence[] = occurrenceDatesIn(transaction).map((when) =>
        ({ id, amount, category, title, currency, type, when, every, frequency })
    );

    return occurrences;
}

export const toOccurrences = (transactions: Transaction[]) => transactions.flatMap(toOccurrence);

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
