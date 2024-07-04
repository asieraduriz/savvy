import { Text, View } from "@/components/Themed";
import { TransactionsList } from "@/components/TransactionsList";
import { useTransactions } from "@/contexts";
import { Link } from "expo-router";

export const TransactionsPage = () => {
  const transactions = useTransactions();

  return (
    <View>
      <Text>Search & Filter</Text>
      <TransactionsList transactions={transactions} />
      <Link href="/add">
        <Text>Add transaction</Text>
      </Link>
    </View>
  );
};
