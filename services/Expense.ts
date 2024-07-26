import { Expense, IExpenseRepository } from "@/types";

export class ExpenseService {
    constructor(private repository: IExpenseRepository) { }

    async readAllExpenses(): Promise<Expense[]> {
        return this.repository.readAll();
    }

    async readExpense(id: string): Promise<Expense | null> {
        return this.repository.read(id);
    }

    async createExpense(expense: Expense): Promise<Expense> {
        return this.repository.create(expense);
    }

    async updateExpense(expense: Expense): Promise<void> {
        await this.repository.update(expense);
    }

    async deleteExpense(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}