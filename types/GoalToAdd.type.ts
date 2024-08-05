import { Category } from "./Category.type";
import { Expense } from "./Expense.type";
import { Goal } from "./Goal.type";
import * as Yup from "yup";

export type GoalToAdd = {
  title: Goal["title"];
  limit: Goal["limit"];
  type: Goal["type"];
  link: Expense["title"] | Category["name"];
};

export const goalToAddSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  limit: Yup.number().required('Limit is required').positive('Limit must be positive'),
  type: Yup.string(),
  link: Yup.string().required('Link is required'),
});