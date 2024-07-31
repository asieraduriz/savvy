import { Expense } from "./Expense.type";


type Goal = {
    id: string;
    category: Expense["title"] | Expense["category"]["name"]
}