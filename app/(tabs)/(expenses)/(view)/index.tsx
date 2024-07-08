import { ScrollView, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Screens } from "@/screens";

export default () => (
    <View style={styles.container}>
        <ScrollView>
            <Screens.Expenses />
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
