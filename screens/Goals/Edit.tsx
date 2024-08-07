import { EditGoalForm } from "@/components/EditGoalForm";
import { View } from "@/components/Themed";
import { useGoals } from "@/contexts/Goals/Provider";
import { FC } from "react";

type Props = {
    id: string;
};

export const EditGoalScreen: FC<Props> = ({ id }) => {
    const { goals } = useGoals();
    const goal = goals.find((goal) => goal.id === id);

    if (!goal) throw new Error(`No goal with id ${id} found`);
    return (
        <View>
            <EditGoalForm goal={goal} />
        </View>
    );
};
