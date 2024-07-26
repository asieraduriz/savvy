import AsyncStorage from "@react-native-async-storage/async-storage";
import { Expense, IExpenseRepository } from "@/types";

export class AsyncStorageExpenseRepository implements IExpenseRepository {
    private readonly STORAGE_KEY = 'expenses';

    private async getExpenses(): Promise<Expense[]> {
        const expensesJson = await AsyncStorage.getItem(this.STORAGE_KEY);
        const expenses: Expense[] = expensesJson ? JSON.parse(expensesJson) : [];

        // Rethink how to handle dates and strings
        return expenses.map((expense) => ({ ...expense, when: new Date(expense.when) }))
    }

    private async saveExpenses(expenses: Expense[]): Promise<void> {
        await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(expenses));
    }

    async readAll(): Promise<Expense[]> {
        return this.getExpenses();
    }

    async read(id: string): Promise<Expense | null> {
        const expenses = await this.getExpenses();
        return expenses.find(expense => expense.id === id) || null;
    }

    async create(expense: Expense): Promise<Expense> {
        const expenses = await this.getExpenses();
        await this.saveExpenses([...expenses, expense]);
        return expense;
    }

    async update(updatedExpense: Expense): Promise<void> {
        const expenses = await this.getExpenses();
        const updatedExpenses = expenses.map(expense =>
            expense.id === updatedExpense.id ? updatedExpense : expense
        );
        await this.saveExpenses(updatedExpenses);
    }

    async delete(id: string): Promise<void> {
        const expenses = await this.getExpenses();
        const updatedExpenses = expenses.filter(expense => expense.id !== id);
        await this.saveExpenses(updatedExpenses);
    }
}