import { OneTimeExpenseItem } from "@/components/ExpenseList/OneTimeExpenseItem";
import { TitleSearch } from "@/components/ExpenseList/TitleSearch";
import { EraseAll } from "@/components/Pressables/EraseAll";
import { Text, View } from "@/components/Themed";
import { useExpenses, useFilter } from "@/contexts";
import { Dates } from "@/datastructures";
import { Expense } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { FC, useMemo } from "react";
import { FlatList } from "react-native";

export const ExpensesScreen: FC = () => {
  const { expenses } = useExpenses();
  const filter = useFilter();

  const expenseTitles = useMemo(() => [...new Set(expenses.map((e) => e.title))], [expenses]);

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
  }, [expenses, filter]);

  const groupedExpenses = useMemo((): [string, Expense[]][] => {
    const groups: { [key: string]: Expense[] } = {};
    filteredExpenses.forEach((expense) => {
      const date = Dates.toFormat(expense.when);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(expense);
    });
    const groupedEntries = Object.entries(groups);

    return groupedEntries;
  }, [filteredExpenses]);

  const renderHeader = () => (
    <View>
      <Link href="/filter">
        <MaterialCommunityIcons name="filter-variant" size={24} color="black" />
      </Link>
      <Link href="/dateFilter">
        <MaterialCommunityIcons name="calendar" size={24} color="black" />
      </Link>
    </View>
  );

  const renderItem = ({ item }: { item: [string, Expense[]] }) => {
    const [date, expenses] = item;
    return (
      <View>
        <Text>{Dates.readable(Dates.At(date))}</Text>
        {expenses.map((expense) => (
          <OneTimeExpenseItem key={expense.id} expense={expense} />
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <EraseAll />

      <TitleSearch terms={expenseTitles} />
      <FlatList
        data={groupedExpenses}
        renderItem={renderItem}
        keyExtractor={([date]) => date}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};
