import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { ExpensesProvider } from "@/contexts";
import { AsyncStorageExpenseRepository } from "@/repositories";
import { ExpenseService } from "@/services/Expense";

export default () => {
  const repository = new AsyncStorageExpenseRepository();
  const expenseService = new ExpenseService(repository);
  const colorScheme = useColorScheme();

  return (
    <ExpensesProvider expenseService={expenseService}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome
                size={28}
                style={{ marginBottom: -3 }}
                name="home"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(expenses)"
          options={{
            headerShown: false,
            title: "Expenses",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="transfer" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="insights"
          options={{
            title: "Insights",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="insights" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="settings" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </ExpensesProvider>
  );
};
