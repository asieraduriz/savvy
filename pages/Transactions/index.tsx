import { OccurrencesList } from "@/components/OccurrencesList";
import { View } from "@/components/Themed";
import { useTransactions } from "@/contexts";
import { Transformers } from "@/transformers";
import { FC, useMemo } from "react";

export const TransactionsPage: FC = () => {
  const transactions = useTransactions();


  const occurrences = useMemo(() => Transformers.toOccurrences(transactions), [transactions]);

  return (
    <View>
      <OccurrencesList occurrences={occurrences} />
    </View>
  );
};
