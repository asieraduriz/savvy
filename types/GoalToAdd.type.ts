import { Category } from "./Category.type";
import { Expense } from "./Expense.type";
import { Goal } from "./Goal.type";

export type GoalToAdd = {
  title: Goal["title"];
  limit: Goal["limit"];
  type: Goal["type"];
  link: Expense["title"] | Category["name"];
};
