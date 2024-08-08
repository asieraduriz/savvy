import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Screens } from "@/screens";
import { ExpensesFilterProvider } from "@/contexts";

export default () => (
    <View style={styles.container}>
        <ExpensesFilterProvider>
            <Screens.View.Expenses />
        </ExpensesFilterProvider>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
