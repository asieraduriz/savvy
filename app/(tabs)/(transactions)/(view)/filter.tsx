import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

export default () => (
    <View style={styles.container}>
        <ScrollView>
            <View><Text>Filter page</Text></View>
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
