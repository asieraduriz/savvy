import React from "react";
import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen name="(view)" options={{ headerShown: false }} />
      <Stack.Screen name="add" options={{ title: "Add expense" }} />
      <Stack.Screen name="edit/[id]" options={{ title: "Edit expense" }} />
    </Stack>
  );
};
