import { Expense } from "./Expense.type";

export interface IExpenseRepository {
    create(expense: Expense): Promise<Expense>;
    readAll(): Promise<Expense[]>;
    read(id: string): Promise<Expense | null>;
    update(expense: Expense): Promise<void>;
    delete(id: string): Promise<void>;
}