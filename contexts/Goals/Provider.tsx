import { Dates } from "@/datastructures";
import { Service } from "@/services";
import { Transformers } from "@/transformers";
import { AddGoalFormType, Goal } from "@/types";
import { randomUUID } from "expo-crypto";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  PropsWithChildren,
} from "react";

interface GoalContextType {
  goals: Goal[];
  isLoading: boolean;
  error: Error | null;
  refreshGoals: () => Promise<void>;
  createGoal: (goal: AddGoalFormType) => Promise<void>;
  updateGoal: (goal: Goal) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
}

const Context = createContext<GoalContextType | null>(null);

type GoalsProviderProps = PropsWithChildren<{
  goalService: Service<Goal>;
}>;

export const GoalsProvider: React.FC<GoalsProviderProps> = ({
  children,
  goalService,
}) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refreshGoals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedGoals = await goalService.readAll();
      setGoals(fetchedGoals);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  }, [goalService]);

  useEffect(() => {
    refreshGoals();
  }, [refreshGoals]);

  const createGoal = useCallback(
    async (goalToAdd: AddGoalFormType) => {

      const goal: Goal = {
        id: randomUUID(),
        created: Dates.Now(),
        ...goalToAdd,
        status: 'active',
      }
      try {
        const newGoal = await goalService.create(goal);
        setGoals((prevGoals) => [...prevGoals, newGoal]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error(
              `Failed to add goal ${goal.id} ${JSON.stringify(goal, null, 4)}`
            )
        );
      }
    },
    [goalService]
  );

  const updateGoal = useCallback(
    async (updatedGoal: Goal) => {
      try {
        await goalService.update(updatedGoal);
        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === updatedGoal.id ? updatedGoal : goal
          )
        );
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to update goal")
        );
      }
    },
    [goalService]
  );

  const deleteGoal = useCallback(
    async (id: string) => {
      try {
        await goalService.delete(id);
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to delete goal")
        );
      }
    },
    [goalService]
  );

  const value = {
    goals,
    isLoading,
    error,
    refreshGoals,
    createGoal,
    updateGoal,
    deleteGoal,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useGoals = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useGoals must be used within an GoalsProvider");
  }
  return context;
};
