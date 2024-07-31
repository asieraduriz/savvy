import { Category } from "./Category.type";
import { Expense } from "./Expense.type";

type TitleLinkedGoal = {
  type: "title-goal";
  link: Expense["title"];
};

type CategoryLinkedGoal = {
  type: "category-goal";
  link: Category["name"];
};

export type Goal = {
  id: string;
  title: string;
  target: number;
  status: "active" | "archived";
} & (TitleLinkedGoal | CategoryLinkedGoal);
