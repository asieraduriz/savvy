import * as Yup from "yup";
import { Expense } from "./Expense.type";

export type ExpenseToEdit = {
  title?: Expense["title"];
  amount?: Expense["amount"];
  category?: Expense["category"];
  categoryIcon?: Expense["categoryIcon"];
  categoryColor?: Expense["categoryColor"];
  type: Expense["type"];
  when: Expense["when"];
};

export const expenseToEditSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .typeError("Amount must be a number"),
  category: Yup.string().required("Category is required"),
  categoryIcon: Yup.string(),
  categoryColor: Yup.string(),
  when: Yup.date(),
});
