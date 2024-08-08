import { Category } from "../Category.type";
import { Expense } from "../Expenses/Expense.type";
import { Goal } from "../Goal.type";
import * as Yup from "yup";

export type AddGoalFormType = {
  title: Goal["title"];
  limit: Goal["limit"];
  type: Goal["type"];
  link: Expense["title"] | Category["name"];
};

export const addGoalFormSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  limit: Yup.number()
    .required("Limit is required")
    .positive("Limit must be positive"),
  type: Yup.string(),
  link: Yup.string().required("Link is required"),
});
