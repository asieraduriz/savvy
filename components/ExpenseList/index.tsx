import { Text, View } from "../Themed";
import { FlatList } from "react-native";
import { OneTimeExpenseItem } from "./OneTimeExpenseItem";
import { Expense } from "@/types";
import { Dates } from "@/datastructures";
import { useMemo } from "react";

type Props = {
  expenses: Expense[];
};

const renderItem = ({ item }: { item: Expense }) => {
  return (
    <View>
      <Text>{Dates.readable(item.when)}</Text>
      <OneTimeExpenseItem expense={item} />
    </View>
  );
};

export const ExpenseList: React.FC<Props> = ({ expenses }) => {
  const groupedExpenses = useMemo((): { [key: string]: Expense[] } => {
    const groups: { [key: string]: Expense[] } = {};
    expenses.forEach((expense) => {
      const date = Dates.toFormat(expense.when);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(expense);
    });
    return groups;
  }, [expenses]);

  return (
    <View>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
