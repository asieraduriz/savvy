import { View } from "@/components/Themed";
import { Screens } from "@/screens";
import { ScrollView } from "react-native";

export default () => (
    <View>
        <ScrollView>
            <Screens.Add.Expense />
        </ScrollView>
    </View>
);
