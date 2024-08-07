import { Card } from "@/components/Card";
import { Text, View } from "@/components/Themed";
import { useGoals } from "@/contexts/Goals/Provider";
import { useRouter } from "expo-router";
import { FC } from "react";

export const GoalsScreen: FC = () => {
  const { goals } = useGoals();

  const { navigate } = useRouter();
  return (
    <View>
      <View>
        <Text>List of goals</Text>
        {goals.map((goal) => (
          <Card key={goal.id} onEditPress={() => navigate(`/editGoal/${goal.id}`)}>
            <Text>
              {goal.title} target:{goal.limit}
            </Text>
          </Card>
        ))}
      </View>
      <View></View>
    </View>
  );
};
