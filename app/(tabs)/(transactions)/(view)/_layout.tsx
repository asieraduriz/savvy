import React from "react";
import { Stack } from "expo-router";
import { OccurrencesFilterProvider } from "@/contexts";

export default () => {
    return (
        <OccurrencesFilterProvider>
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="filter" options={{ headerShown: false }} />
            </Stack>
        </OccurrencesFilterProvider>
    );
};
