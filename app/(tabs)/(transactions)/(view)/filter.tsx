import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Pages } from "@/pages";

export default () => (
    <View style={styles.container}>
        <Pages.Filter />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
