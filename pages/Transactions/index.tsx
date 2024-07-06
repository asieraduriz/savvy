import { OccurrencesList } from "@/components/OccurrencesList";
import { RecurrentOccurrenceItem } from "@/components/OccurrencesList/RecurrentTransactionItem";
import { SingleOccurrenceItem } from "@/components/OccurrencesList/SingleTransactionItem";
import { Text, View } from "@/components/Themed";
import { TransactionsList } from "@/components/TransactionsList";
import { useTransactions } from "@/contexts";
import { Transformers } from "@/transformers";
import { format } from "date-fns";
import { Link } from "expo-router";
import { FC, useCallback, useMemo } from "react";
import { FlatList } from "react-native";

export const TransactionsPage: FC = () => {
  const transactions = useTransactions();

  const occurrences = useMemo(() => Transformers.toOccurrences(transactions).sort((a, b) => b.when.getTime() - a.when.getTime()), [transactions]);
  const groupedOccurrences = useMemo(() => Transformers.toGroupedByDateOccurences(transactions).sort((a, b) => b.when.getTime() - a.when.getTime()), [transactions]);

  const renderItem = useCallback(({ item }: { item: typeof groupedOccurrences[number] }) => (
    <View>
      <Text>{format(item.when, "MMM do yyyy")}</Text>
      {item.occurences.map((occurrence) =>
        occurrence.type === 'single' ? <SingleOccurrenceItem occurrence={occurrence} /> : <RecurrentOccurrenceItem occurrence={occurrence} />
      )}
    </View>

  ), []);

  return (
    <View>
      <FlatList
        data={groupedOccurrences}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.when.getTime()}`}
      />
      <Text>-----------------------------------------------------------</Text>
      <OccurrencesList occurrences={occurrences} />

      <TransactionsList transactions={transactions} />
      <Link href="/add">
        <Text>Add transaction</Text>
      </Link>
    </View>
  );
};
