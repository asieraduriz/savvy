import { Category, ExpenseBase, OneTimeExpenseBase } from "./Expense.type";


export type ExpenseToAdd = Pick<ExpenseBase, "title" | "amount"> & OneTimeExpenseBase & {
    category: Category["name"]
    categoryIcon: Category["iconName"]
    categoryColor: Category["color"]
};