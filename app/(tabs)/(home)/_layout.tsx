import React from "react";
import { Stack } from "expo-router";
import { ExpensesFilterProvider } from "@/contexts";

export default () => {
    return (
        <ExpensesFilterProvider>
            <Stack>
                <Stack.Screen name="index" options={{ title: "Home" }} />
                <Stack.Screen name="dateFilter" options={{ title: "Home date filter" }} />
            </Stack>
        </ExpensesFilterProvider>
    );
};
