import React from "react";
import { Stack } from "expo-router";
import { EntriesFilterProvider } from "@/contexts";

export default () => {
  return (
    <EntriesFilterProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="filter" options={{ headerShown: false }} />
      </Stack>
    </EntriesFilterProvider>
  );
};
