import { EntriesList } from "@/components/EntriesList";
import { View } from "@/components/Themed";
import { useExpenses } from "@/contexts";
import { Transformers } from "@/transformers";
import { FC, useMemo } from "react";

export const ExpensesScreen: FC = () => {
  const expenses = useExpenses();
  const entries = useMemo(() => Transformers.toEntries(expenses), [expenses]);

  return (
    <View>
      <EntriesList entries={entries} />
    </View>
  );
};
