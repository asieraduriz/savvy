import React from "react";
import { Link, Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default () => {
  return (
    <Stack>
      <Stack.Screen name="(view)" options={{
        title: "Expenses", headerRight: ({ tintColor }) => <Link href="/add">
          <MaterialCommunityIcons name="wallet-plus" size={24} color={tintColor} />
        </Link>

      }} />
      <Stack.Screen name="add" options={{ title: "Add expense" }} />
      <Stack.Screen name="edit/[id]" options={{ title: "Edit expense" }} />
    </Stack>
  );
};
