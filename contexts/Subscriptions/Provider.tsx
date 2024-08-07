import { Dates } from "@/datastructures";
import { Service } from "@/services";
import { Subscription, SubscriptionToCreate } from "@/types";
import { randomUUID } from "expo-crypto";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  PropsWithChildren,
} from "react";

interface SubscriptionContextType {
  subscriptions: Subscription[];
  isLoading: boolean;
  error: Error | null;
  refreshSubscriptions: () => Promise<void>;
  createSubscription: (subscription: SubscriptionToCreate) => Promise<Subscription | undefined>;
  updateSubscription: (subscription: Subscription) => Promise<void>;
  deleteSubscription: (id: string) => Promise<void>;
}

const Context = createContext<SubscriptionContextType | null>(null);

type SubscriptionsProviderProps = PropsWithChildren<{
  subscriptionService: Service<Subscription>;
}>;

export const SubscriptionsProvider: React.FC<SubscriptionsProviderProps> = ({
  children,
  subscriptionService,
}) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshSubscriptions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedSubscriptions = await subscriptionService.readAll();
      setSubscriptions(fetchedSubscriptions);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  }, [subscriptionService]);

  useEffect(() => {
    refreshSubscriptions();
  }, [refreshSubscriptions]);

  const createSubscription = useCallback(
    async (subscriptionToCreate: SubscriptionToCreate) => {
      const subscription: Subscription = {
        id: randomUUID(),
        created: Dates.Now(),
        ...subscriptionToCreate
      }

      try {
        const newSubscription = await subscriptionService.create(subscription);
        setSubscriptions((prevSubscriptions) => [...prevSubscriptions, newSubscription]);
        return newSubscription;
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to add subscription")
        );
      }
    },
    [subscriptionService]
  );

  const updateSubscription = useCallback(
    async (updatedSubscription: Subscription) => {
      try {
        await subscriptionService.update(updatedSubscription);
        setSubscriptions((prevSubscription) =>
          prevSubscription.map((subscription) =>
            subscription.id === updatedSubscription.id ? updatedSubscription : subscription
          )
        );
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to update subscription")
        );
      }
    },
    [subscriptionService]
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
          err instanceof Error ? err : new Error("Failed to delete subscription")
        );
      }
    },
    [subscriptionService]
  );

  const value = {
    subscriptions,
    isLoading,
    error,
    refreshSubscriptions,
    createSubscription,
    updateSubscription,
    deleteSubscription,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useSubscriptions = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useSubscriptions must be used within an SubscriptionsProvider"
    );
  }
  return context;
};
