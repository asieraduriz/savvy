import { Text, View } from "../Themed";
import { FlatList } from "react-native";
import { OneTimeExpenseItem } from "./OneTimeExpenseItem";
import { useCallback, useMemo, useState } from "react";
import { Transformers } from "@/transformers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Expense } from "@/types";

type Props = {
  expenses: Expense[];
};

const renderItem = ({ item }: { item: Expense }) => {
  return (
    <View>
      <Text>{Transformers.toFormattedDate(item.when)}</Text>
      <OneTimeExpenseItem expense={item} />
    </View>
  );
};

export const ExpenseList: React.FC<Props> = ({ expenses }) => {
  const [filteredEntries, setFilteredEntries] = useState<Expense[]>(expenses);

  const entryTitles = useMemo(
    () => new Set(filteredEntries.map((o) => o.title)),
    [filteredEntries]
  );
  const entryCategories = useMemo(
    () => new Set(filteredEntries.map((o) => o.category)),
    [filteredEntries]
  );

  const onSearchBoxQueryChange = useCallback(
    (query: string) => {
      const filtered = expenses.filter((t) =>
        t.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEntries(filtered);
    },
    [expenses]
  );

  return (
    <View>
      <Link href="/filter">
        <MaterialCommunityIcons name="filter-variant" size={24} color="black" />
      </Link>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
