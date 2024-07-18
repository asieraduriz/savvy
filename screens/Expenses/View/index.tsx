import { ExpenseList } from "@/components/ExpenseList";
import { TitleSearch } from "@/components/ExpenseList/TitleSearch";
import { Text, View } from "@/components/Themed";
import { useExpenses, useFilter } from "@/contexts";
import { Dates } from "@/datastructures";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FC, useMemo } from "react";

export const ExpensesScreen: FC = () => {
  const expenses = useExpenses();
  const filter = useFilter();

  const expenseTitles = useMemo(
    () => [...new Set(expenses.map((e) => e.title))],
    [expenses]
  );

  const filteredExpenses = useMemo(() => {
    const { titleQuery, start, end } = filter;
    const searchTerm = titleQuery.toLowerCase();

    return expenses.filter((expense) => {
      if (start && end && !Dates.isBetweenDays(expense.when, start, end)) {
        return false;
      }

      if (!titleQuery) return true;

      return expense.title.toLowerCase().includes(searchTerm);
    });
  }, [expenses, filter.start, filter.end, filter.titleQuery]);

  return (
    <View>
      <Text>{JSON.stringify(filter, null, 2)}</Text>

      <TitleSearch terms={expenseTitles} />
      <Link href="/filter">
        <MaterialCommunityIcons name="filter-variant" size={24} color="black" />
      </Link>
      <Link href="/dateFilter">
        <MaterialCommunityIcons name="calendar" size={24} color="black" />
      </Link>
      <ExpenseList expenses={filteredExpenses} />
    </View>
  );
};
