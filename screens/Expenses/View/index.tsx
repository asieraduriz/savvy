import { ExpenseList } from "@/components/ExpenseList";
import { View } from "@/components/Themed";
import { useExpenses } from "@/contexts";
import { FC } from "react";

export const ExpensesScreen: FC = () => {
  const expenses = useExpenses();

  return (
    <View>
      <ExpenseList expenses={expenses} />
    </View>
  );
};
