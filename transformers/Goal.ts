import { AddGoalFormType, GoalToCreate } from "@/types";

export const toGoal = (goalToAdd: AddGoalFormType): GoalToCreate => ({
  title: goalToAdd.title,
  limit: goalToAdd.limit,
  link: goalToAdd.link,
  type: goalToAdd.type,
  status: "active",
});
