import {
  AsyncStorageExpenseRepository,
  AsyncStorageGoalRepository,
  AsyncStorageSubscriptionRepository,
} from "@/repositories";
import { Expense, Goal, IRepository, Subscription } from "@/types";

export class Service<T> {
  constructor(private repository: IRepository<T>) { }

  async readAll(): Promise<T[]> {
    return this.repository.readAll();
  }

  async read(id: string): Promise<T | null> {
    return this.repository.read(id);
  }

  async create(item: T): Promise<T> {
    return this.repository.create(item);
  }

  async update(item: T): Promise<void> {
    await this.repository.update(item);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export class ServiceFactory {
  static create() {
    return {
      expenses: new Service<Expense>(new AsyncStorageExpenseRepository()),
      subscriptions: new Service<Subscription>(
        new AsyncStorageSubscriptionRepository()
      ),
      goals: new Service<Goal>(new AsyncStorageGoalRepository()),
    };
  }
}
