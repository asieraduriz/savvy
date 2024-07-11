import React from "react";
import { Stack } from "expo-router";
import { ExpensesFilterProvider } from "@/contexts";

export default () => {
  return (
    <ExpensesFilterProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="filter" options={{ headerShown: false }} />
        <Stack.Screen name="dateFilter" options={{ headerShown: false }} />
      </Stack>
    </ExpensesFilterProvider>
  );
};
