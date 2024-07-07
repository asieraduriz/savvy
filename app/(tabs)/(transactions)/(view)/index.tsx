import { ScrollView, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Pages } from "@/pages";

export default () => (
    <View style={styles.container}>
        <ScrollView>
            <Pages.Transactions />
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
