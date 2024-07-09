import {
  GroupedEntry,
  SubscriptionExpense,
  Expense,
  SubscriptionExpenseFrequency,
} from "@/types";
import { Entry, SubscriptionEntry, OneTimeEntry } from "@/types";
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  getTime,
  isBefore,
  startOfDay,
} from "date-fns";

const entryDatesIn = (expense: SubscriptionExpense): Date[] => {
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
        throw new Error("Invalid unit provided");
    }
  }

  return repeatedDates;
};

export const toEntry = (expense: Expense): Entry[] => {
  if (expense.type === "onetime") {
    const { id, amount, category, title, type, when } = expense;
    const oneTimeEntry: OneTimeEntry = {
      id,
      amount,
      category,
      title,
      type,
      when,
    };

    return [oneTimeEntry];
  }

  const { id, amount, category, title, type, every, frequency } = expense;
  const subscriptionEntries: SubscriptionEntry[] = entryDatesIn(expense).map(
    (when) => ({ id, amount, category, title, type, when, every, frequency })
  );

  return subscriptionEntries;
};

export const toEntries = (expenses: Expense[]) => expenses.flatMap(toEntry);

export const toGroupedByDateEntries = (entries: Entry[]): GroupedEntry[] => {
  entries.sort((a, b) => b.when.getTime() - a.when.getTime());

  const groups: GroupedEntry[] = [];
  let currentGroup: GroupedEntry | null = null;

  for (const entry of entries) {
    const when = getTime(startOfDay(entry.when));

    if (!currentGroup || currentGroup.when !== when) {
      if (currentGroup) {
        groups.push(currentGroup);
      }
      currentGroup = { when, entries: [] };
    }

    currentGroup.entries.push(entry);
  }

  if (currentGroup) {
    groups.push(currentGroup);
  }

  return groups;
};
