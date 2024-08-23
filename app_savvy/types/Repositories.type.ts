export interface IRepository<T> {
    create(expense: T): Promise<T>;
    readAll(): Promise<T[]>;
    read(id: string): Promise<T | null>;
    update(expense: T): Promise<void>;
    delete(id: string): Promise<void>;
}