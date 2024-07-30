import React from "react";
import { Link, Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ExpensesFilterProvider } from "@/contexts";

export default () => {
    return (
        <ExpensesFilterProvider>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        title: "Expenses",
                        headerRight: ({ tintColor }) => (
                            <Link href="/add">
                                <MaterialCommunityIcons name="wallet-plus" size={24} color={tintColor} />
                            </Link>
                        ),
                    }}
                />
                <Stack.Screen name="filter" options={{ title: "Filter" }} />
                <Stack.Screen name="dateFilter" options={{ title: "Date filter" }} />
            </Stack>
        </ExpensesFilterProvider>
    );
};
