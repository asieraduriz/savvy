import { Category } from "../Category.type";
import { Expense } from "../Expense.type";
import { Goal } from "../Goal.type";
import * as Yup from "yup";

export type AddLinkedMontlyLimitGoalFormType = {
  title: Goal["title"];
  limit: Goal["limit"];
  link: Expense["title"] | Category["name"];
  linkType: Goal["linkType"];
  type: Goal["type"]
};

export const addLinkedMontlyLimitGoalFormSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  linkType: Yup.string(),
  link: Yup.string().required("Link is required"),
  limit: Yup.number()
    .required("Limit is required")
    .positive("Limit must be positive"),
});
