import { Dates } from "@/datastructures";
import { Service } from "@/services";
import { Expense, ExpenseToCreate } from "@/types";
import { randomUUID } from "expo-crypto";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  PropsWithChildren,
} from "react";

interface ExpenseContextType {
  expenses: Expense[];
  isLoading: boolean;
  error: Error | null;
  refreshExpenses: () => Promise<void>;
  createExpense: (expense: ExpenseToCreate) => Promise<void>;
  updateExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  getRecentExpenses: () => Expense[];
  getExpensesByCategory: () => Map<string, Expense[]>;
}

const Context = createContext<ExpenseContextType | null>(null);

type ExpensesProviderProps = PropsWithChildren<{
  expenseService: Service<Expense>;
}>;

export const ExpensesProvider: React.FC<ExpensesProviderProps> = ({
  children,
  expenseService,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshExpenses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedExpenses = await expenseService.readAll();
      fetchedExpenses.sort((a, b) => b.when.getTime() - a.when.getTime());
      setExpenses(fetchedExpenses);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  }, [expenseService]);

  useEffect(() => {
    refreshExpenses();
  }, [refreshExpenses]);

  const createExpense = useCallback(
    async (expenseToCreate: ExpenseToCreate) => {
      const expense: Expense = {
        id: randomUUID(),
        created: Dates.Now(),
        ...expenseToCreate
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

  const value = {
    expenses,
    isLoading,
    error,
    refreshExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
    getRecentExpenses,
    getExpensesByCategory,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useExpenses = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
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

export const useGroupedExpenses = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useExpenses must be used within an useGroupedExpenses");
  }
  return context.getExpensesByCategory();
};
