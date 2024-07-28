import { OneTimeExpenseItem } from "@/components/ExpenseList/OneTimeExpenseItem";
import { Text, View } from "@/components/Themed";
import { useGroupedExpenses, useRecentExpenses } from "@/contexts";
import { Link } from "expo-router";
import { FC } from "react";

export const HomeScreen: FC = () => {
    const { currentMonthExpenses, lastMonthExpenses } = useRecentExpenses();
    const groupedExpenses = useGroupedExpenses();

    return (
        <View>
            <Link href="(expenses)/add"><Text>New expense</Text></Link>
            <Text>Most recent expenses</Text>
            {currentMonthExpenses.map((expense) => (
                <OneTimeExpenseItem key={expense.id} expense={expense} />
            ))}
            <Link href="(expenses)/(view)/">
                <Text>View more</Text>
            </Link>

            <View>
                <Text>By categories</Text>
                {Array.from(groupedExpenses.entries()).map(([category, expenses]) => (
                    <View key={category}>
                        <Text>{category}: {expenses.reduce((amt, expense) => amt + expense.amount, 0)}</Text>

                    </View>
                ))}
            </View>
        </View>
    );
};
