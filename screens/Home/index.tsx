import { OneTimeExpenseItem } from "@/components/ExpenseList/OneTimeExpenseItem";
import { DateFilter } from "@/components/Filters/DateFilter";
import { FullScreenModal } from "@/components/Modal";
import { EraseAll } from "@/components/Pressables/EraseAll";
import { PopulateApp } from "@/components/Pressables/PopulateData";
import { Text, View } from "@/components/Themed";
import { useRecentExpenses, useSpendings } from "@/contexts/Spendings/Provider";
import { Dates } from "@/datastructures";
import { useToggle } from "@/hooks";
import { SubscriptionStatus } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { FC, Fragment, useMemo } from "react";
import { Pressable, ScrollView } from "react-native";

export const HomeScreen: FC = () => {
  const [showDateFilter, dateFilterToggle] = useToggle(false);
  const { navigate } = useRouter();
  const recentExpenses = useRecentExpenses();

  const { subscriptions } = useSpendings();

  const activeOrderedSubscriptions = useMemo(() => {
    return subscriptions
      .filter((subscription) => subscription.status === SubscriptionStatus.active)
      .map((subscription) => ({
        ...subscription,
        next: Dates.nextOccurrence(subscription.start, {
          interval: subscription.interval,
          every: subscription.every,
        }),
      }))
      .sort((a, b) => a.next.getTime() - b.next.getTime()); // Closest first
  }, [subscriptions]);

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      {/* <PopulateApp />
      <EraseAll /> */}
      <Pressable onPress={() => navigate("/add/expense")}>
        <Text>New one time expense</Text>
      </Pressable>
      <Pressable onPress={() => navigate("/add/subscription")}>
        <Text>New subscription</Text>
      </Pressable>
      <Text>Most recent expenses</Text>
      {recentExpenses.map(([date, expenses]) => (
        <Fragment key={date}>
          <Text>{Dates.readable(Dates.At(date))}</Text>
          {
            expenses.map((expense) =>
              <OneTimeExpenseItem expense={expense} key={expense.id} />
            )
          }
        </Fragment>
      ))}
      <Link href="/expenses">
        <Text>View more</Text>
        <MaterialIcons name="read-more" size={24} />
      </Link>
      <View>
        <Text>Active subscriptions</Text>
        {activeOrderedSubscriptions.map((subscription) => (
          <View key={subscription.id}>
            <Text>
              {subscription.title} {subscription.every} {subscription.interval} {Dates.toFormat(subscription.start)}
            </Text>
            <Text>Upcoming at {Dates.toFormat(subscription.next)}</Text>
            <Text>Amount: {subscription.amount}</Text>
            <Link href={`/edit/subscription/${subscription.id}`}>
              <Text>Edit</Text>
            </Link>
          </View>
        ))}
      </View>
      <FullScreenModal visible={showDateFilter} onClose={dateFilterToggle.off}>
        <DateFilter />
      </FullScreenModal>
    </ScrollView>
  );
};
