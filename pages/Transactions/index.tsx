import { OccurrencesList } from "@/components/OccurrencesList";
import { Text, View } from "@/components/Themed";
import { TransactionsList } from "@/components/TransactionsList";
import { useTransactions } from "@/contexts";
import { Transformers } from "@/transformers";
import { Link } from "expo-router";
import { FC, useMemo } from "react";

export const TransactionsPage: FC = () => {
  const transactions = useTransactions();

  const occurrences = useMemo(() => Transformers.toOccurrences(transactions).sort((a, b) => b.when.getTime() - a.when.getTime()), [transactions]);
  return (
    <View>
      <OccurrencesList occurrences={occurrences} />
      <TransactionsList transactions={transactions} />
      <Link href="/add">
        <Text>Add transaction</Text>
      </Link>
    </View>
  );
};
