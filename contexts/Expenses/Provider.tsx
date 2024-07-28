import { Dates } from '@/datastructures';
import { Service } from '@/services';
import { Expense, Subscription } from '@/types';
import { createContext, useContext, useState, useCallback, useEffect, PropsWithChildren } from 'react';

interface ExpenseContextType {
    expenses: Expense[];
    isLoading: boolean;
    error: Error | null;
    refreshExpenses: () => Promise<void>;
    createExpense: (expense: Expense) => Promise<void>;
    updateExpense: (expense: Expense) => Promise<void>;
    deleteExpense: (id: string) => Promise<void>;
    getRecentExpenses: (period: 'currentMonth' | 'lastMonth') => Expense[];
    getExpensesByCategory: () => Map<string, Expense[]>;
}

const Context = createContext<ExpenseContextType | null>(null);

type ExpensesProviderProps = PropsWithChildren<{ subscriptionService: Service<Subscription>; expenseService: Service<Expense>; }>

export const ExpensesProvider: React.FC<ExpensesProviderProps> = ({ children, expenseService }) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const refreshExpenses = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedExpenses = await expenseService.readAll();
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
            const newExpense = await expenseService.create(expense);
            setExpenses(prevExpenses => [...prevExpenses, newExpense]);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to add expense'));
        }
    }, [expenseService]);

    const updateExpense = useCallback(async (updatedExpense: Expense) => {
        try {
            await expenseService.update(updatedExpense);
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
            await expenseService.delete(id);
            setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to delete expense'));
        }
    }, [expenseService]);

    const getRecentExpenses = useCallback((period: 'currentMonth' | 'lastMonth'): Expense[] => {
        const now = Dates.Now();

        let startDate: Date;
        let endDate: Date;

        if (period === 'currentMonth') {
            startDate = Dates.startOfMonth(now);
            endDate = Dates.endOfMonth(now);
        } else {
            startDate = Dates.startOfMonth(Dates.subMonths(now, 1));
            endDate = Dates.endOfMonth(Dates.subMonths(now, 1));
        }

        return expenses.filter(expense => {
            return expense.when >= startDate && expense.when <= endDate;
        });
    }, [expenses]);

    const getExpensesByCategory = useCallback((): Map<string, Expense[]> => {
        const categoryMap = new Map<string, Expense[]>();

        for (const expense of expenses) {
            if (!categoryMap.has(expense.category.name)) {
                categoryMap.set(expense.category.name, []);
            }
            categoryMap.get(expense.category.name)!.push(expense);
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

    return <Context.Provider value={value}>{children}</Context.Provider>
};

export const useExpenses = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useExpenses must be used within an ExpensesProvider');
    }
    return context;
};

export const useRecentExpenses = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useExpenses must be used within an useRecentExpenses');
    }

    const currentMonthExpenses = context.getRecentExpenses('currentMonth');
    const lastMonthExpenses = context.getRecentExpenses('lastMonth');
    return { currentMonthExpenses, lastMonthExpenses };
}

export const useGroupedExpenses = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useExpenses must be used within an useGroupedExpenses');
    }
    return context.getExpensesByCategory();
}