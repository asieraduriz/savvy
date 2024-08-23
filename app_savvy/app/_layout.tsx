import { CategoriesProvider } from "@/contexts/Categories/Provider";
import { GoalsProvider } from "@/contexts/Goals/Provider";
import { SpendingsProvider } from "@/contexts/Spendings/Provider";
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
  const { categories, expenses, subscriptions, goals } = ServiceFactory.create();

  return (
    <SafeAreaProvider>
      <CategoriesProvider categoryService={categories}>
        <SpendingsProvider
          expenseService={expenses}
          subscriptionService={subscriptions}
        >
          <GoalsProvider goalService={goals}>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                <Stack.Screen
                  name="add/expense"
                  options={{ headerTitle: "Add expense" }}
                />
                <Stack.Screen
                  name="edit/expense/[id]"
                  options={{ headerTitle: "Edit expense" }}
                />

                <Stack.Screen
                  name="add/subscription"
                  options={{ headerTitle: "Add subscription" }}
                />
                <Stack.Screen
                  name="edit/subscription/[id]"
                  options={{ headerTitle: "Edit subscription" }}
                />

                <Stack.Screen
                  name="add/goal"
                  options={{ headerTitle: "Add goal" }}
                />
                <Stack.Screen
                  name="edit/goal/[id]"
                  options={{ headerTitle: "Edit goal" }}
                />
              </Stack>
            </ThemeProvider>
          </GoalsProvider>
        </SpendingsProvider>
      </CategoriesProvider>
    </SafeAreaProvider>
  );
}
