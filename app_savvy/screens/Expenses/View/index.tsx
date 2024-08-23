import { OneTimeExpenseItem } from "@/components/ExpenseList/OneTimeExpenseItem";
import { TitleSearch } from "@/components/ExpenseList/TitleSearch";
import { DateFilter } from "@/components/Filters/DateFilter";
import { FullScreenModal } from "@/components/Modal";
import { Text, View } from "@/components/Themed";
import { useFilter } from "@/contexts";
import { useSpendings } from "@/contexts/Spendings/Provider";
import { Dates } from "@/datastructures";
import { useToggle } from "@/hooks";
import { Expense } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FC, useMemo } from "react";
import { FlatList, Pressable } from "react-native";

export const ExpensesScreen: FC = () => {
  const [showDateFilter, dateFilterToggle] = useToggle(false);
  const { expenses } = useSpendings();
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
      <Pressable onPress={dateFilterToggle.on}>
        <MaterialCommunityIcons name="calendar" size={24} />
      </Pressable>
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
      <TitleSearch terms={expenseTitles} />
      <FlatList
        data={groupedExpenses}
        renderItem={renderItem}
        keyExtractor={([date]) => date}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
      />
      <FullScreenModal visible={showDateFilter} onClose={dateFilterToggle.off}>
        <DateFilter />
      </FullScreenModal>
    </View>
  );
};
