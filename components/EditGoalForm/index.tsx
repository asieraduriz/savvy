import { Goal } from "@/types";
import { Text, View } from "../Themed";
import { FC } from "react";

type Props = {
    goal: Goal;
};

export const EditGoalForm: FC<Props> = ({ goal }) => (
    <View>
        <Text>{JSON.stringify(goal, null, 4)}</Text>
    </View>
);
