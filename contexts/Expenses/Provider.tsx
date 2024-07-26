import { ExpenseService } from '@/services/Expense';
import { Expense } from '@/types';
import { createContext, useContext, useState, useCallback, useEffect, PropsWithChildren } from 'react';

interface ExpenseContextType {
  expenses: Expense[];
  isLoading: boolean;
  error: Error | null;
  refreshExpenses: () => Promise<void>;
  createExpense: (expense: Expense) => Promise<void>;
  updateExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

const Context = createContext<ExpenseContextType | null>(null);

type ExpensesProviderProps = PropsWithChildren<{ expenseService: ExpenseService; }>

export const ExpensesProvider: React.FC<ExpensesProviderProps> = ({ children, expenseService }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshExpenses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedExpenses = await expenseService.readAllExpenses();
      setExpenses(fetchedExpenses);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, [expenseService]);

  useEffect(() => {
    refreshExpenses();
  }, [refreshExpenses]);

  const createExpense = useCallback(async (expense: Expense) => {
    try {
      const newExpense = await expenseService.createExpense(expense);
      setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add expense'));
    }
  }, [expenseService]);

  const updateExpense = useCallback(async (updatedExpense: Expense) => {
    try {
      await expenseService.updateExpense(updatedExpense);
      setExpenses(prevExpenses =>
        prevExpenses.map(expense =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update expense'));
    }
  }, [expenseService]);

  const deleteExpense = useCallback(async (id: string) => {
    try {
      await expenseService.deleteExpense(id);
      setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete expense'));
    }
  }, [expenseService]);

  const value = {
    expenses,
    isLoading,
    error,
    refreshExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>
};

export const useExpenses = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpensesProvider');
  }
  return context;
};