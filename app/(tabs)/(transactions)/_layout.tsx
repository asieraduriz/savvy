import React from "react";
import { Stack } from "expo-router";

export default () => {

    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Transactions" }} />
            <Stack.Screen name="add" options={{ title: "Add transaction" }} />
        </Stack>
    );
};
