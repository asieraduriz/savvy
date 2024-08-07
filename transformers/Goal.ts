import { GoalToAdd, GoalToCreate } from "@/types";

export const toGoal = (goalToAdd: GoalToAdd): GoalToCreate => ({
    title: goalToAdd.title,
    limit: goalToAdd.limit,
    link: goalToAdd.link,
    type: goalToAdd.type,
    status: 'active',
})