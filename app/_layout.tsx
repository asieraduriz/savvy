import { ExpensesProvider } from "@/contexts";
import { GoalsProvider } from "@/contexts/Goals/Provider";
import { SubscriptionsProvider } from "@/contexts/Subscriptions/Provider";
import { ServiceFactory } from "@/services";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  tabs: "home",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default () => {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const { expenses, subscriptions, goals } = ServiceFactory.create();


  return (
    <SafeAreaProvider>
      <SubscriptionsProvider subscriptionService={subscriptions}>
        <ExpensesProvider expenseService={expenses}>
          <GoalsProvider goalService={goals}>
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: "modal" }} />

                <Stack.Screen name="add/expense" options={{ headerTitle: 'Adding expenseee' }} />
                <Stack.Screen name="edit/[expenseId]" />

                <Stack.Screen name="add/subscription" />
                <Stack.Screen name="edit/[subscriptionId]" />

                <Stack.Screen name="add/goal" />
                <Stack.Screen name="edit/[goalId]" />
              </Stack>
            </ThemeProvider>
          </GoalsProvider>
        </ExpensesProvider>
      </SubscriptionsProvider>
    </SafeAreaProvider>
  );
}
