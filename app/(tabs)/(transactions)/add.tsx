import { View } from "@/components/Themed";
import { Pages } from "@/pages";
import { ScrollView } from "react-native";

export default () => (
  <View>
    <ScrollView>
      <Pages.AddTransactions />
    </ScrollView>
  </View>
);
