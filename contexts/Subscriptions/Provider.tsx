import { Service } from '@/services';
import { Expense, Subscription } from '@/types';
import { createContext, useContext, useState, useCallback, useEffect, PropsWithChildren } from 'react';

interface SubscriptionContextType {
    subscriptions: Subscription[];
    isLoading: boolean;
    error: Error | null;
    refreshSubscriptions: () => Promise<void>;
    createSubscription: (expense: Subscription) => Promise<void>;
    updateSubscription: (expense: Subscription) => Promise<void>;
    deleteSubscription: (id: string) => Promise<void>;
}

const Context = createContext<SubscriptionContextType | null>(null);

type SubscriptionsProviderProps = PropsWithChildren<{ subscriptionService: Service<Subscription>; expenseService: Service<Expense>; }>

export const SubscriptionsProvider: React.FC<SubscriptionsProviderProps> = ({ children, subscriptionService }) => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const refreshSubscriptions = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedExpenses = await subscriptionService.readAll();
            setSubscriptions(fetchedExpenses);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        } finally {
            setIsLoading(false);
        }
    }, [subscriptionService]);

    useEffect(() => {
        refreshSubscriptions();
    }, [refreshSubscriptions]);

    const createSubscription = useCallback(async (expense: Subscription) => {
        try {
            const newExpense = await subscriptionService.create(expense);
            setSubscriptions(prevExpenses => [...prevExpenses, newExpense]);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to add expense'));
        }
    }, [subscriptionService]);

    const updateSubscription = useCallback(async (updatedExpense: Subscription) => {
        try {
            await subscriptionService.update(updatedExpense);
            setSubscriptions(prevExpenses =>
                prevExpenses.map(expense =>
                    expense.id === updatedExpense.id ? updatedExpense : expense
                )
            );
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to update expense'));
        }
    }, [subscriptionService]);

    const deleteSubscription = useCallback(async (id: string) => {
        try {
            await subscriptionService.delete(id);
            setSubscriptions(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to delete expense'));
        }
    }, [subscriptionService]);

    const value = {
        subscriptions,
        isLoading,
        error,
        refreshSubscriptions,
        createSubscription,
        updateSubscription,
        deleteSubscription,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>
};

export const useSubscriptions = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useSubscriptions must be used within an SubscriptionsProvider');
    }
    return context;
};
