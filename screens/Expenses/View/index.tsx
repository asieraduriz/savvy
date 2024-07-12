import { ExpenseList } from "@/components/ExpenseList";
import { TitleSearch } from "@/components/ExpenseList/TitleSearch";
import { Text, View } from "@/components/Themed";
import { useExpenses, useFilter } from "@/contexts";
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

  return (
    <View>
      <TitleSearch terms={expenseTitles} />
      <Link href="/filter">
        <MaterialCommunityIcons name="filter-variant" size={24} color="black" />
      </Link>
      <Link href="/dateFilter">
        <MaterialCommunityIcons name="calendar" size={24} color="black" />
      </Link>
      <ExpenseList expenses={expenses} />
      <Text>{JSON.stringify(filter, null, 2)}</Text>
    </View>
  );
};
