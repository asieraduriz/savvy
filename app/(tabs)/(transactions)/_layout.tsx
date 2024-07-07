import React from "react";
import { Link, Stack } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: "Transactions", headerRight: ({ tintColor }) => <Link href="/add">
          <MaterialCommunityIcons name="wallet-plus" size={24} color={tintColor} />
        </Link>

      }} />
      <Stack.Screen name="add" options={{ title: "Add transaction" }} />
      <Stack.Screen name="edit/[id]" options={{ title: "Edit transaction" }} />
    </Stack>
  );
};
