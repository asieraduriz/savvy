import React, { useCallback, useContext, useEffect, useState } from "react";
import { randomUUID } from "expo-crypto";
import { Dates } from "@/datastructures";
import { Service } from "@/services";
import { Subscription, SubscriptionToCreate } from "@/types";
import { Expense, ExpenseToCreate } from "@/types/Expenses/Expense.type";

interface SpendingsContextType {
  expenses: Expense[];
  subscriptions: Subscription[];
  isLoading: boolean;
  error: Error | null;
  refreshSpendings: () => Promise<void>;
  createExpense: (expense: ExpenseToCreate) => Promise<void>;
  createSubscription: (
    subscription: SubscriptionToCreate
  ) => Promise<Subscription | undefined>;
  updateExpense: (expense: Expense) => Promise<void>;
  updateSubscription: (subscription: Subscription) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  deleteSubscription: (id: string) => Promise<void>;
  getRecentExpenses: () => Expense[];
  getExpensesByCategory: () => Map<string, Expense[]>;
  getNextSubscriptionDates: () => Subscription[];
}

const Context = React.createContext<SpendingsContextType | null>(null);

type SpendingsProviderProps = React.PropsWithChildren<{
  expenseService: Service<Expense>;
  subscriptionService: Service<Subscription>;
}>;

export const SpendingsProvider: React.FC<SpendingsProviderProps> = ({
  children,
  expenseService,
  subscriptionService,
}) => {
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
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  }, [expenseService, subscriptionService]);

  useEffect(() => {
    refreshSpendings();
  }, [refreshSpendings]);

  const createExpense = useCallback(
    async (expenseToCreate: ExpenseToCreate) => {
      const expense: Expense = {
        id: randomUUID(),
        created: Dates.Now(),
        ...expenseToCreate,
      };

      try {
        const newExpense = await expenseService.create(expense);
        setExpenses((prevExpenses) =>
          [...prevExpenses, newExpense].sort(
            (a, b) => b.when.getTime() - a.when.getTime()
          )
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error(
                `Failed to add expense ${expense.id} ${JSON.stringify(
                  expense,
                  null,
                  4
                )}`
              )
        );
      }
    },
    [expenseService]
  );

  const createSubscription = useCallback(
    async (subscriptionToCreate: SubscriptionToCreate) => {
      const subscription: Subscription = {
        id: randomUUID(),
        created: Dates.Now(),
        ...subscriptionToCreate,
      };

      try {
        const newSubscription = await subscriptionService.create(subscription);
        setSubscriptions((prevSubscriptions) => [
          ...prevSubscriptions,
          newSubscription,
        ]);
        return newSubscription;
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to add subscription")
        );
      }
    },
    [subscriptionService]
  );

  const updateExpense = useCallback(
    async (updatedExpense: Expense) => {
      try {
        await expenseService.update(updatedExpense);
        setExpenses((prevExpenses) =>
          prevExpenses
            .map((expense) =>
              expense.id === updatedExpense.id ? updatedExpense : expense
            )
            .sort((a, b) => b.when.getTime() - a.when.getTime())
        );
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to update expense")
        );
      }
    },
    [expenseService]
  );

  const updateSubscription = useCallback(
    async (updatedSubscription: Subscription) => {
      try {
        await subscriptionService.update(updatedSubscription);
        setSubscriptions((prevSubscriptions) =>
          prevSubscriptions.map((subscription) =>
            subscription.id === updatedSubscription.id
              ? updatedSubscription
              : subscription
          )
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to update subscription")
        );
      }
    },
    [subscriptionService]
  );

  const deleteExpense = useCallback(
    async (id: string) => {
      try {
        await expenseService.delete(id);
        setExpenses((prevExpenses) =>
          prevExpenses
            .filter((expense) => expense.id !== id)
            .sort((a, b) => b.when.getTime() - a.when.getTime())
        );
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to delete expense")
        );
      }
    },
    [expenseService]
  );

  const deleteSubscription = useCallback(
    async (id: string) => {
      try {
        await subscriptionService.delete(id);
        setSubscriptions((prevSubscriptions) =>
          prevSubscriptions.filter((subscription) => subscription.id !== id)
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to delete subscription")
        );
      }
    },
    [subscriptionService]
  );

  const getRecentExpenses = useCallback(
    (): Expense[] => expenses.slice(0, 5),
    [expenses]
  );
  const getExpensesByCategory = useCallback((): Map<string, Expense[]> => {
    const categoryMap = new Map<string, Expense[]>();

    for (const expense of expenses) {
      if (!categoryMap.has(expense.category)) {
        categoryMap.set(expense.category, []);
      }
      categoryMap.get(expense.category)!.push(expense);
    }

    return categoryMap;
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
    createExpense,
    createSubscription,
    updateExpense,
    updateSubscription,
    deleteExpense,
    deleteSubscription,
    getRecentExpenses,
    getExpensesByCategory,
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
