import { Dates } from "@/datastructures";
import { Goal, GoalToAdd } from "@/types";
import { randomUUID } from "expo-crypto";

export const toGoal = (goalToAdd: GoalToAdd): Goal => ({
    title: goalToAdd.title,
    limit: goalToAdd.limit,
    link: goalToAdd.link,
    type: goalToAdd.type,
    status: 'active',
    // New properties
    id: randomUUID(),
    created: Dates.Now(),
})