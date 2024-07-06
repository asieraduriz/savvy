import { Text, View } from "@/components/Themed";
import { TransactionList } from "@/components/TransactionsList";
import { useTransactions } from "@/contexts";
import { Link } from "expo-router";
import { FC } from "react";

export const TransactionsPage: FC = () => {
  const transactions = useTransactions();

  return (
    <View>
      <TransactionList transactions={transactions} />
      <Link href="/add">
        <Text>Add transaction</Text>
      </Link>
    </View>
  );
};
