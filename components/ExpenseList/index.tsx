import { Text, View } from "../Themed";
import { FlatList } from "react-native";
import { OneTimeExpenseItem } from "./OneTimeExpenseItem";
import { Transformers } from "@/transformers";
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
