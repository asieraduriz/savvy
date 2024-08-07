import React from "react";
import { Link, Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Subscriptions",
                    headerRight: ({ tintColor }) => (
                        <Link href="/addSubscription">
                            <MaterialIcons name="add-circle" size={24} color={tintColor} />
                        </Link>
                    ),
                }}
            />
            <Stack.Screen name="addSubscription" options={{ title: "Add subscription" }} />
            <Stack.Screen name="editSubscription/[id]" options={{ title: "Edit subscription" }} />
        </Stack>
    );
};
