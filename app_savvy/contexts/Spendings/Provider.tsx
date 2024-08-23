import React, { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { randomUUID } from "expo-crypto";
import { Dates } from "@/datastructures";
import { Service } from "@/services";
import { Subscription } from "@/types";
import { Expense } from "@/types/Expense.type";
import { AddSpendingFormType } from "@/types/Forms/AddSpendingForm.type";
import { Transformers } from "@/transformers";

interface SpendingsContextType {
  expenses: Expense[];
  subscriptions: Subscription[];
  isLoading: boolean;
  error: Error | null;
  refreshSpendings: () => Promise<void>;
  createSpending: (spending: AddSpendingFormType) => Promise<void>;
  updateExpense: (expense: Expense) => Promise<void>;
  updateSubscription: (subscription: Subscription) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  deleteSubscription: (id: string) => Promise<void>;
  getRecentExpenses: () => [string, Expense[]][];
  getNextSubscriptionDates: () => Subscription[];
}

const Context = createContext<SpendingsContextType | null>(null);

type SpendingsProviderProps = PropsWithChildren<{
  expenseService: Service<Expense>;
  subscriptionService: Service<Subscription>;
}>;

export const SpendingsProvider: FC<SpendingsProviderProps> = ({ children, expenseService, subscriptionService }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshSpendings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedExpenses = await expenseService.readAll();
      const fetchedSubscriptions = await subscriptionService.readAll();

      fetchedExpenses.sort((a, b) => b.when.getTime() - a.when.getTime());
      fetchedSubscriptions.sort(
        (a, b) =>
          Dates.nextOccurrence(a.start, {
            interval: a.interval,
            every: a.every,
          }).getTime() -
          Dates.nextOccurrence(b.start, {
            interval: b.interval,
            every: b.every,
          }).getTime()
      );

      setExpenses(fetchedExpenses);
      setSubscriptions(fetchedSubscriptions);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An unknown error occurred"));
    } finally {
      setIsLoading(false);
    }
  }, [expenseService, subscriptionService]);

  useEffect(() => {
    refreshSpendings();
  }, [refreshSpendings]);

  const createSpending = useCallback(async (spending: AddSpendingFormType) => {
    if (spending.type === "onetime") {
      const expense: Expense = {
        id: randomUUID(),
        created: Dates.Now(),
        ...Transformers.toOneTimeExpense(spending),
      };

      const newExpense = await expenseService.create(expense);
      setExpenses((prevExpenses) => [...prevExpenses, newExpense].sort((a, b) => b.when.getTime() - a.when.getTime()));
    } else {
      const subscription: Subscription = {
        id: randomUUID(),
        created: Dates.Now(),
        ...Transformers.toSubscription(spending)
      };

      const newSubscription = await subscriptionService.create(subscription);
      setSubscriptions((prevSubscriptions) => [...prevSubscriptions, newSubscription]);

      if (spending.pastSubscriptionChargeDates?.length) {
        if (!subscription)
          throw new Error(
            `Error adding subscription ${JSON.stringify(spending)}`
          );
        const subscriptionExpenses = spending.pastSubscriptionChargeDates.map(
          (date) =>
            Transformers.toSubscriptionExpense(spending, date, subscription.id)
        );

        const createdSubscriptionExpenses: Expense[] = [];
        for (const subscriptionExpense of subscriptionExpenses) {
          const newExpense = await expenseService.create({
            id: randomUUID(),
            created: Dates.Now(),
            ...subscriptionExpense
          });
          createdSubscriptionExpenses.push(newExpense);
        }

        setExpenses((prevExpenses) => [...prevExpenses, ...createdSubscriptionExpenses].sort((a, b) => b.when.getTime() - a.when.getTime()));

      }

    }
  }, [expenseService, subscriptionService]);

  const updateExpense = useCallback(
    async (updatedExpense: Expense) => {
      try {
        await expenseService.update(updatedExpense);
        setExpenses((prevExpenses) =>
          prevExpenses
            .map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense))
            .sort((a, b) => b.when.getTime() - a.when.getTime())
        );
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to update expense"));
      }
    },
    [expenseService]
  );

  const updateSubscription = useCallback(
    async (updatedSubscription: Subscription) => {
      try {
        await subscriptionService.update(updatedSubscription);
        setSubscriptions((prevSubscriptions) =>
          prevSubscriptions.map((subscription) => (subscription.id === updatedSubscription.id ? updatedSubscription : subscription))
        );
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to update subscription"));
      }
    },
    [subscriptionService]
  );

  const deleteExpense = useCallback(
    async (id: string) => {
      try {
        await expenseService.delete(id);
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== id).sort((a, b) => b.when.getTime() - a.when.getTime())
        );
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to delete expense"));
      }
    },
    [expenseService]
  );

  const deleteSubscription = useCallback(
    async (id: string) => {
      try {
        await subscriptionService.delete(id);
        setSubscriptions((prevSubscriptions) => prevSubscriptions.filter((subscription) => subscription.id !== id));
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to delete subscription"));
      }
    },
    [subscriptionService]
  );

  const getRecentExpenses = useCallback((): [string, Expense[]][] => {
    const recentExpenses = expenses.slice(0, 5);
    const groups: { [key: string]: Expense[] } = {};
    recentExpenses.forEach((expense) => {
      const date = Dates.toFormat(expense.when);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(expense);
    });
    const groupedEntries = Object.entries(groups);

    return groupedEntries;
  }, [expenses]);

  const getNextSubscriptionDates = useCallback((): Subscription[] => {
    return subscriptions.sort(
      (a, b) =>
        Dates.nextOccurrence(a.start, {
          interval: a.interval,
          every: a.every,
        }).getTime() -
        Dates.nextOccurrence(b.start, {
          interval: b.interval,
          every: b.every,
        }).getTime()
    );
  }, [subscriptions]);

  const value = {
    expenses,
    subscriptions,
    isLoading,
    error,
    refreshSpendings,
    createSpending,
    updateExpense,
    updateSubscription,
    deleteExpense,
    deleteSubscription,
    getRecentExpenses,
    getNextSubscriptionDates,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useSpendings = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useSpendings must be used within an SpendingsProvider");
  }
  return context;
};

export const useRecentExpenses = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useExpenses must be used within an useRecentExpenses");
  }

  const recentExpenses = context.getRecentExpenses();
  return recentExpenses;
};
