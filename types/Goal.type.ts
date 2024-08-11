import { Category } from "./Category.type";

type GoalBase = {
  id: string;
  created: Date;
  title: string;
  status: "active" | "archived";
};

type CategoryLinkedGoal = {
  linkType: "category-goal";
  link: Category["id"];
};

type LinkedMonthlyLimitGoal = {
  limit: number;
  start: Date;
  end?: Date;
  pastMonths: {
    start: Date;
    end: Date;
    limit: number;
    actual: number;
  }[]
  type: 'linkedMontlyLimit'
} & (CategoryLinkedGoal);

export type Goal = GoalBase & (LinkedMonthlyLimitGoal);