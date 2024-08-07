import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { ExpensesProvider } from "@/contexts";
import { ServiceFactory } from "@/services";
import { SubscriptionsProvider } from "@/contexts/Subscriptions/Provider";
import { GoalsProvider } from "@/contexts/Goals/Provider";

export default () => {
  const { expenses, subscriptions, goals } = ServiceFactory.create();

  const colorScheme = useColorScheme();

  return (
    <SubscriptionsProvider subscriptionService={subscriptions}>
      <ExpensesProvider expenseService={expenses}>
        <GoalsProvider goalService={goals}>
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
              name="(subscriptions)"
              options={{
                headerShown: false,
                title: "Subscriptions",
                tabBarIcon: ({ color }) => (
                  <FontAwesome5 name="coins" size={24} color={color} />
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
        </GoalsProvider>
      </ExpensesProvider>
    </SubscriptionsProvider>
  );
};
