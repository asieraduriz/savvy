import { GoalToAdd } from "@/types";
import { FC } from "react";
import { useGoals } from "@/contexts/Goals/Provider";
import { Transformers } from "@/transformers";
import { View } from "../Themed";
import { Button } from "react-native";

type Props = {
    goalToAdd: GoalToAdd;
    onSuccess: () => void;
};

export const Submit: FC<Props> = ({ goalToAdd, onSuccess }) => {
    const { createGoal } = useGoals();

    const onSubmitHandle = async () => {
        const newGoal = Transformers.toGoal(goalToAdd);
        await createGoal(newGoal);
        onSuccess();
    };

    return (
        <View>
            <Button title="Add goal" onPress={onSubmitHandle} />
        </View>
    );
};
