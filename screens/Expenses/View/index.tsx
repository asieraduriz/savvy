import { OccurrencesList } from "@/components/OccurrencesList";
import { View } from "@/components/Themed";
import { useExpenses } from "@/contexts";
import { Transformers } from "@/transformers";
import { FC, useMemo } from "react";

export const ExpensesScreen: FC = () => {
  const expenses = useExpenses();
  const occurrences = useMemo(
    () => Transformers.toOccurrences(expenses),
    [expenses]
  );

  return (
    <View>
      <OccurrencesList occurrences={occurrences} />
    </View>
  );
};
