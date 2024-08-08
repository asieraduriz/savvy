import { OneTimeExpenseItem } from "@/components/ExpenseList/OneTimeExpenseItem";
import { EraseAll } from "@/components/Pressables/EraseAll";
import { PopulateApp } from "@/components/Pressables/PopulateData";
import { Text, View } from "@/components/Themed";
import { useFilter } from "@/contexts";
import {
  useGroupedExpenses,
  useRecentExpenses,
  useSpendings,
} from "@/contexts/Spendings/Provider";
import { Dates } from "@/datastructures";
import { SubscriptionStatus } from "@/types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { FC, Fragment, useMemo } from "react";
import { Pressable, ScrollView } from "react-native";

export const HomeScreen: FC = () => {
  const { navigate } = useRouter();
  const filter = useFilter();
  const recentExpenses = useRecentExpenses();
  const groupedExpenses = useGroupedExpenses();

  const { subscriptions } = useSpendings();

  const activeOrderedSubscriptions = useMemo(() => {
    return subscriptions
      .filter(
        (subscription) => subscription.status === SubscriptionStatus.active
      )
      .map((subscription) => ({
        ...subscription,
        next: Dates.nextOccurrence(subscription.start, {
          interval: subscription.interval,
          every: subscription.every,
        }),
      }))
      .sort((a, b) => a.next.getTime() - b.next.getTime()); // Closest first
  }, [subscriptions]);

  const filteredGroupExpenses = useMemo(() => {
    const { start, end } = filter;
    if (!start || !end) return groupedExpenses;

    const filteredGroupExpenses = new Map([...groupedExpenses]);
    for (const [category, expenses] of filteredGroupExpenses) {
      filteredGroupExpenses.set(
        category,
        expenses.filter((expense) =>
          Dates.isBetweenDays(expense.when, start, Dates.addDays(end, 1))
        )
      );
    }

    return filteredGroupExpenses;
  }, [groupedExpenses, filter]);

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      {/* <PopulateApp /> */}
      <Pressable onPress={() => navigate("/add/expense")}>
        <Text>New one time expense</Text>
      </Pressable>
      <Pressable onPress={() => navigate("/add/subscription")}>
        <Text>New subscription</Text>
      </Pressable>
      <Text>Most recent expenses</Text>
      {recentExpenses.map((expense) => (
        <Fragment key={expense.id}>
          <Text>{Dates.readable(expense.when)}</Text>
          <OneTimeExpenseItem expense={expense} />
        </Fragment>
      ))}
      <Link href="/expenses">
        <Text>View more</Text>
        <MaterialIcons name="read-more" size={24} />
      </Link>

      <View>
        <Text>By categories</Text>
        <Link href="/filter/dateFilters">
          <MaterialCommunityIcons name="calendar" size={24} />
        </Link>
        {Array.from(filteredGroupExpenses.entries()).map(
          ([category, expenses]) => (
            <View key={category}>
              <Text>
                {category}:{" "}
                {expenses.reduce((amt, expense) => amt + expense.amount, 0)}
              </Text>
            </View>
          )
        )}
      </View>

      <View>
        <Text>Active subscriptions</Text>
        {activeOrderedSubscriptions.map((subscription) => (
          <View key={subscription.id}>
            <Text>
              {subscription.title} {subscription.every} {subscription.interval}{" "}
              {Dates.toFormat(subscription.start)}
            </Text>
            <Text>Upcoming at {Dates.toFormat(subscription.next)}</Text>
            <Text>Amount: {subscription.amount}</Text>
            <Link href={`/edit/subscription/${subscription.id}`}>
              <Text>Edit</Text>
            </Link>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
