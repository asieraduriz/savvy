import { Text, View } from "@/components/Themed";
import { ScrollView } from "react-native";

type Props = {
  id: string;
};

export const EditTransactionForm = ({ id }: Props) => {
  return (
    <View>
      <ScrollView>
        <Text>Id view {id}</Text>
      </ScrollView>
    </View>
  );
};
