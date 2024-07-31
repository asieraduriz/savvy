import React from "react";
import { Link, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Goals",
          headerRight: ({ tintColor }) => (
            <Link href="/addGoal">
              <MaterialIcons name="add-circle" size={24} color={tintColor} />
            </Link>
          ),
        }}
      />
      <Stack.Screen name="addGoal" options={{ title: "Add goal" }} />
      <Stack.Screen name="editGoal/[id]" options={{ title: "Edit goal" }} />
    </Stack>
  );
};
