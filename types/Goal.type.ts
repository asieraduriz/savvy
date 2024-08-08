import { Category } from "./Category.type";
import { Expense } from "./Expenses/Expense.type";

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
  created: Date;
  title: string;
  limit: number;
  status: "active" | "archived";
} & (TitleLinkedGoal | CategoryLinkedGoal);

export type GoalToCreate = Omit<Goal, "id" | "created"> &
  (TitleLinkedGoal | CategoryLinkedGoal);
