import { Card } from "@/components/Card";
import { Circle } from "@/components/Circle";
import { OneTimeExpenseItem } from "@/components/ExpenseList/OneTimeExpenseItem";
import { DateFilter } from "@/components/Filters/DateFilter";
import { FullScreenModal } from "@/components/Modal";
import { EraseAll } from "@/components/Pressables/EraseAll";
import { PopulateApp } from "@/components/Pressables/PopulateData";
import { Text, View } from "@/components/Themed";
import { useCategories } from "@/contexts/Categories/Provider";
import { useRecentExpenses, useSpendings } from "@/contexts/Spendings/Provider";
import { Dates } from "@/datastructures";
import { useToggle } from "@/hooks";
import { SubscriptionStatus } from "@/types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { FC, Fragment, useMemo } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

const DEBUG = false;

export const HomeScreen: FC = () => {
  const router = useRouter()
  const [showDateFilter, dateFilterToggle] = useToggle(false);
  const { navigate } = useRouter();
  const recentExpenses = useRecentExpenses();

  const { subscriptions } = useSpendings();
  const { findCategory } = useCategories();
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
      {DEBUG ? <PopulateApp /> : null}
      {DEBUG ? <EraseAll /> : null}
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
        {activeOrderedSubscriptions.map((subscription) => {
          const category = findCategory(subscription.categoryId)!;
          return (
            <Card
              onEditPress={() => router.navigate(`/edit/subscription/${subscription.id}`)}
              key={subscription.id}
            >
              <Circle backgroundColor={category.color}>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "space-around",
                    gap: 10,
                    justifyContent: "center",
                  }}
                >
                  <View>

                    <Text style={styles.titleText}>
                      {subscription.title} {subscription.amount}
                    </Text>
                    <MaterialCommunityIcons name={category.iconName} size={32} />
                    <Text style={styles.categoryText}>{category.name}</Text>
                  </View>
                  <Text>Next cycle at {Dates.readable(subscription.next)}</Text>
                </View>
              </Circle>
            </Card>
          )
        })}
      </View>
      <FullScreenModal visible={showDateFilter} onClose={dateFilterToggle.off}>
        <DateFilter />
      </FullScreenModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: "#ccc",
  },
  categoryText: {
    fontSize: 14,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
});
