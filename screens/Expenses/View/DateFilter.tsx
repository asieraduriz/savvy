import { FC } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

export const DateFilterScreen: FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <Text style={styles.tab}>Tab 1</Text>
        <Text style={styles.tab}>Tab 2</Text>
        <Text style={styles.tab}>Tab 3</Text>
      </View>
      <View style={styles.contentWithTabs}>
        {/* Your main content components go here */}
        <Text>Main Content Area</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  tabsContainer: {
    width: 100,
    backgroundColor: "#ccc",
    justifyContent: "space-around",
  },
  tab: {
    padding: 16,
  },
  contentWithTabs: {
    flex: 1,
    padding: 16,
  },
  contentWithoutTabs: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    padding: 8,
    backgroundColor: "#eee",
    borderRadius: 4,
  },
});
