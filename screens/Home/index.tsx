import { OneTimeExpenseItem } from "@/components/ExpenseList/OneTimeExpenseItem";
import { Text, View } from "@/components/Themed";
import { useGroupedExpenses, useRecentExpenses } from "@/contexts";
import { useSubscriptions } from "@/contexts/Subscriptions/Provider";
import { Dates } from "@/datastructures";
import { SubscriptionStatus } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { FC, Fragment, useMemo } from "react";
import { Button, ScrollView } from "react-native";

export const HomeScreen: FC = () => {
    const recentExpenses = useRecentExpenses();
    const groupedExpenses = useGroupedExpenses();

    const { subscriptions } = useSubscriptions();

    const activeOrderedSubscriptions = useMemo(() => {
        return subscriptions
            .filter((subscription) => subscription.status === SubscriptionStatus.active)
            .map((subscription) => ({
                ...subscription,
                next: Dates.nextOccurrence(subscription.start, { interval: subscription.interval, every: subscription.every }),
            }))
            .sort((a, b) => a.next.getTime() - b.next.getTime()); // Closest first
    }, [subscriptions]);

    return (
        <ScrollView>
            {/* <Button title="Erase all" onPress={() => {
                AsyncStorage.clear()
            }} /> */}
            <Link href="(expenses)/add">
                <Text>New expense</Text>
            </Link>
            <Text>Most recent expenses</Text>
            {recentExpenses.map((expense) => (
                <Fragment key={expense.id}>
                    <Text>{Dates.readable(expense.when)}</Text>
                    <OneTimeExpenseItem expense={expense} />
                </Fragment>
            ))}
            <Link href="(expenses)/(view)/">
                <Text>View more</Text>
            </Link>

            <View>
                <Text>By categories</Text>
                {Array.from(groupedExpenses.entries()).map(([category, expenses]) => (
                    <View key={category}>
                        <Text>
                            {category}: {expenses.reduce((amt, expense) => amt + expense.amount, 0)}
                        </Text>
                    </View>
                ))}
            </View>

            <View>
                <Text>Active subscriptions</Text>
                {activeOrderedSubscriptions.map((subscription) => (
                    <View key={subscription.id}>
                        <Text>
                            {subscription.title} {subscription.every} {subscription.interval} {Dates.toFormat(subscription.start)}
                        </Text>
                        <Text>Upcoming at {Dates.toFormat(subscription.next)}</Text>
                        <Text>{subscription.amount}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};
