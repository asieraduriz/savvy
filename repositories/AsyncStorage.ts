import AsyncStorage from "@react-native-async-storage/async-storage";
import { Goal, IRepository, Subscription, SubscriptionStatus } from "@/types";
import { Expense } from "@/types/Expense.type";

export class AsyncStorageExpenseRepository implements IRepository<Expense> {
  private readonly STORAGE_KEY = "expenses";

  private async getExpenses(): Promise<Expense[]> {
    const expensesJson = await AsyncStorage.getItem(this.STORAGE_KEY);
    const expenses: Expense[] = expensesJson ? JSON.parse(expensesJson) : [];

    // Rethink how to handle dates and strings
    return expenses.map((expense) => ({
      ...expense,
      when: new Date(expense.when),
      created: new Date(expense.created),
    }));
  }

  private async saveExpenses(expenses: Expense[]): Promise<void> {
    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(expenses));
  }

  async readAll(): Promise<Expense[]> {
    return this.getExpenses();
  }

  async read(id: string): Promise<Expense | null> {
    const expenses = await this.getExpenses();
    return expenses.find((expense) => expense.id === id) || null;
  }

  async create(expense: Expense): Promise<Expense> {
    const expenses = await this.getExpenses();
    await this.saveExpenses([...expenses, expense]);
    return expense;
  }

  async update(updatedExpense: Expense): Promise<void> {
    const expenses = await this.getExpenses();
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    await this.saveExpenses(updatedExpenses);
  }

  async delete(id: string): Promise<void> {
    const expenses = await this.getExpenses();
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    await this.saveExpenses(updatedExpenses);
  }
}

export class AsyncStorageSubscriptionRepository
  implements IRepository<Subscription> {
  private readonly STORAGE_KEY = "subscriptions";

  private async getSubscriptions(): Promise<Subscription[]> {
    const subscriptionsJson = await AsyncStorage.getItem(this.STORAGE_KEY);
    const subscriptions: Subscription[] = subscriptionsJson
      ? JSON.parse(subscriptionsJson)
      : [];

    // Rethink how to handle dates and strings
    return subscriptions.map((subscription) => ({
      ...subscription,
      created: new Date(subscription.created),
      start: new Date(subscription.start),
      end: subscription.end ? new Date(subscription.end) : undefined,
    }));
  }

  private async saveSubscriptions(
    subscriptions: Subscription[]
  ): Promise<void> {
    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(subscriptions));
  }

  async readAll(): Promise<Subscription[]> {
    return this.getSubscriptions();
  }

  async read(id: string): Promise<Subscription | null> {
    const subscriptions = await this.getSubscriptions();
    return subscriptions.find((subscription) => subscription.id === id) || null;
  }

  async create(subscription: Subscription): Promise<Subscription> {
    const subscriptions = await this.getSubscriptions();
    await this.saveSubscriptions([...subscriptions, subscription]);
    return subscription;
  }

  async update(updatedSubscription: Subscription): Promise<void> {
    const subscriptions = await this.getSubscriptions();
    const updatedSubscriptions = subscriptions.map((subscription) =>
      subscription.id === updatedSubscription.id
        ? updatedSubscription
        : subscription
    );
    await this.saveSubscriptions(updatedSubscriptions);
  }

  async delete(id: string): Promise<void> {
    const subscriptions = await this.getSubscriptions();
    const subscriptionToUpdate = subscriptions.find(
      (subscription) => subscription.id === id
    );

    if (!subscriptionToUpdate) {
      throw new Error(
        `AsyncStorage<Subscription> delete: Subscription with id ${id} not found!`
      );
    }
    await this.update({
      ...subscriptionToUpdate,
      status: SubscriptionStatus.archived,
    });
  }
}

export class AsyncStorageGoalRepository implements IRepository<Goal> {
  private readonly STORAGE_KEY = "goals";

  private async getgoals(): Promise<Goal[]> {
    const goalsJson = await AsyncStorage.getItem(this.STORAGE_KEY);
    const goals: Goal[] = goalsJson ? JSON.parse(goalsJson) : [];

    return goals;
  }

  private async savegoals(goals: Goal[]): Promise<void> {
    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(goals));
  }

  async readAll(): Promise<Goal[]> {
    return this.getgoals();
  }

  async read(id: string): Promise<Goal | null> {
    const goals = await this.getgoals();
    return goals.find((goal) => goal.id === id) || null;
  }

  async create(goal: Goal): Promise<Goal> {
    const goals = await this.getgoals();
    await this.savegoals([...goals, goal]);
    return goal;
  }

  async update(updatedgoal: Goal): Promise<void> {
    const goals = await this.getgoals();
    const updatedgoals = goals.map((goal) =>
      goal.id === updatedgoal.id ? updatedgoal : goal
    );
    await this.savegoals(updatedgoals);
  }

  async delete(id: string): Promise<void> {
    const goals = await this.getgoals();
    const goalToUpdate = goals.find((goal) => goal.id === id);
    if (!goalToUpdate) {
      throw new Error(
        `AsyncStorage<Subscription> delete: Subscription with id ${id} not found!`
      );
    }
    await this.update({ ...goalToUpdate, status: "archived" });
  }
}
