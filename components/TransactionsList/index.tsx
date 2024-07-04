import { Transaction } from "@/types";
import { Link } from "expo-router";
import { FC } from "react";
import { Text, View } from "../Themed";
import { FontAwesome } from "@expo/vector-icons";

type Props = { transactions: Transaction[] };

export const TransactionsList: FC<Props> = ({ transactions }) => {
  return (
    <View>
      {transactions.map((transaction) => (
        <View
          key={transaction.id}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Text>{transaction.title}</Text>
          <Link href={`/edit/${transaction.id}`}>
            <FontAwesome name="edit" size={24} color="black" />
          </Link>
        </View>
      ))}
    </View>
  );
};
