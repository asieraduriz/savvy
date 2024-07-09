import { ExpenseList } from "@/components/ExpenseList";
import { View } from "@/components/Themed";
import { useExpenses } from "@/contexts";
import { Transformers } from "@/transformers";
import { FC, useMemo } from "react";

export const ExpensesScreen: FC = () => {
  const expenses = useExpenses();
  const entries = useMemo(() => Transformers.toEntries(expenses), [expenses]);

  return (
    <View>
      <ExpenseList expenses={entries} />
    </View>
  );
};
