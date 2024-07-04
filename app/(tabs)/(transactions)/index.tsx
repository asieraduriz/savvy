import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Text>Search & Filter</Text>
                </View>
                <View>
                    <Text>Transaction list</Text>
                </View>
                <View>
                    <Link href="/add">Add transaction</Link>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
