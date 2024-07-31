import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { ExpensesProvider } from "@/contexts";
import { ServiceFactory } from "@/services";
import { SubscriptionsProvider } from "@/contexts/Subscriptions/Provider";

export default () => {
  const { expenses, subscriptions } = ServiceFactory.create();

  const colorScheme = useColorScheme();

  return (
    <SubscriptionsProvider
      expenseService={expenses}
      subscriptionService={subscriptions}
    >
      <ExpensesProvider
        expenseService={expenses}
        subscriptionService={subscriptions}
      >
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
                <MaterialCommunityIcons
                  name="transfer"
                  size={28}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="(goals)"
            options={{
              headerShown: false,
              title: "Goals",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="bullseye-arrow"
                  size={28}
                  color={color}
                />
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
    </SubscriptionsProvider>
  );
};
