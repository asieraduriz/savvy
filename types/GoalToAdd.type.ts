import { Category } from "./Category.type";
import { Expense } from "./Expense.type";
import { Goal } from "./Goal.type";

export type GoalToAdd = {
  title: string;
  target: number;
  type: Goal["type"];
  titleLink: Expense["title"];
  categoryLink: Category["name"];
};
