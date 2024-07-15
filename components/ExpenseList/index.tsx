import { Text, View } from "../Themed";
import { FlatList } from "react-native";
import { OneTimeExpenseItem } from "./OneTimeExpenseItem";
import { Expense } from "@/types";
import { Dates } from "@/datastructures";

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
