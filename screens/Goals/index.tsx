import { Text, View } from "@/components/Themed";
import { useExpenses } from "@/contexts";
import { useGoals } from "@/contexts/Goals/Provider";
import { Dates } from "@/datastructures";
import { FC, useMemo } from "react";

export const GoalsScreen: FC = () => {
  const { expenses } = useExpenses();
  const { goals } = useGoals();

  const today = Dates.Today();
  const startDate = Dates.subDays(today, 40);

  const { titleGoalsReport, categoryGoalsReport } = useMemo(() => {
    const filteredExpenses = expenses.filter((expense) =>
      Dates.isBetweenDays(expense.when, startDate, today)
    );
    const titleGoalsReport: {
      [key: string]: { spent: number; limit: number };
    } = {};
    const categoryGoalsReport: {
      [key: string]: { spent: number; limit: number };
    } = {};

    goals.forEach((goal) => {
      const filterByTitle = goal.type === "title-goal";

      const expenses = filteredExpenses.filter((expense) =>
        filterByTitle
          ? expense.title === goal.link
          : expense.category.name === goal.link
      );

      if (expenses.length) {
        if (filterByTitle) {
          if (!titleGoalsReport[goal.title]) {
            titleGoalsReport[goal.title].spent = expenses.reduce(
              (added, expense) => added + expense.amount,
              0
            );
            titleGoalsReport[goal.title].limit = goal.target;
          }
        } else {
          if (!categoryGoalsReport[goal.title])
            categoryGoalsReport[goal.title].spent = expenses.reduce(
              (added, expense) => added + expense.amount,
              0
            );
          categoryGoalsReport[goal.title].limit = goal.target;
        }
      }
    });

    return {
      titleGoalsReport,
      categoryGoalsReport,
    };
  }, [expenses, goals]);

  return (
    <View>
      <View>
        <Text>List of goals</Text>
        {goals.map((goal) => (
          <Text key={goal.id}>
            {`${goal.title} Related to ${
              goal.type === "title-goal" ? "title" : "category"
            } ${goal.link}`}
          </Text>
        ))}
      </View>
      <View>
        <Text>Report on current month</Text>
        {Object.entries(titleGoalsReport).map(([title, { spent, limit }]) => (
          <View key={`title-${title}`}>
            <Text>{`Spent on ${title} title: ${spent} vs Limit:${limit}`}</Text>
          </View>
        ))}
        {Object.entries(categoryGoalsReport).map(
          ([category, { spent, limit }]) => (
            <View key={`title-${category}`}>
              <Text>{`Spent on ${category} category: ${spent} vs Limit:${limit}`}</Text>
            </View>
          )
        )}
      </View>
    </View>
  );
};
