import { Transaction } from "@/types";
import { FC } from "react";
import { View } from "../Themed";
import { SingleTransactionItem } from "./SingleTransactionItem";
import { RecurrentTransactionItem } from "./RecurrentTransactionItem";

type Props = { transactions: Transaction[] };

export const TransactionsList: FC<Props> = ({ transactions }) => {
  const sortTransaction = (transaction: Transaction) => {
    switch (transaction.type) {
      case "single":
        return <SingleTransactionItem transaction={transaction} />;
      case "recurrent":
        return <RecurrentTransactionItem transaction={transaction} />;
    }
  };

  return (
    <View>
      {transactions.map((transaction) => (
        <View
          key={transaction.id}
          style={{ display: "flex", flexDirection: "row", gap: 8 }}
        >
          {sortTransaction(transaction)}
        </View>
      ))}
    </View>
  );
};
