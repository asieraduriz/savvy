import { Text, View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";

export default () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <ScrollView>
        <Text>Id view {id}</Text>
      </ScrollView>
    </View>
  );
};
