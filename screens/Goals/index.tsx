import { Text, View } from "@/components/Themed";
import { useExpenses } from "@/contexts";
import { useGoals } from "@/contexts/Goals/Provider";
import { Dates } from "@/datastructures";
import { FC, useMemo } from "react";

export const GoalsScreen: FC = () => {
  const { expenses } = useExpenses();
  const { goals } = useGoals();

  const today = Dates.Tomorrow();
  const startDate = Dates.subDays(today, 40);

  const { byCategories, byTitles } = useMemo(() => {
    const filteredExpenses = expenses.filter((expense) => Dates.isBetweenDays(expense.when, startDate, today));

    const report = {
      byCategories: [],
      byTitles: []
    } as { [key in "byCategories" | "byTitles"]: { title: string; spent: number; limit: number }[] };

    goals.map((goal) => {
      const isCategoryGoal = goal.type === 'category-goal';

      if (isCategoryGoal) {
        const goalExpenses = filteredExpenses.filter((expense) => expense.category.name === goal.link);
        report.byCategories.push({ title: goal.link, spent: goalExpenses.reduce((accumulator, expense) => accumulator + expense.amount, 0), limit: goal.target })
      } else {
        const goalExpenses = filteredExpenses.filter((expense) => expense.title === goal.link);
        report.byTitles.push({ title: goal.link, spent: goalExpenses.reduce((accumulator, expense) => accumulator + expense.amount, 0), limit: goal.target })
      }

    });

    return report;
  }, []);

  return (
    <View>
      <View>
        <Text>List of goals</Text>
        {goals.map((goal) => (
          <Text key={goal.id}>
            {`${goal.title} Related to ${goal.type === "title-goal" ? "title" : "category"
              } ${goal.link}`}
          </Text>
        ))}
      </View>
      {
        byCategories.map(({ title, spent, limit }) => <Text key={title}>{`Goal ${title} spent ${spent} vs limit ${limit}`}</Text>)
      }
      {
        byTitles.map(({ title, spent, limit }) => <Text key={title}>{`Goal ${title} spent ${spent} vs limit ${limit}`}</Text>)
      }
      <View>

      </View>
    </View>
  );
};
