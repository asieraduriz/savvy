import { EditExpenseForm } from "@/components/EditExpenseForm";
import { View } from "@/components/Themed";
import { useExpenses } from "@/contexts";
import { FC } from "react";

type Props = {
  id: string;
};

export const EditExpenseScreen: FC<Props> = ({ id }) => {
  const { expenses } = useExpenses();
  const expense = expenses.find((expense) => expense.id === id);

  if (!expense) throw new Error(`No expense with id ${id} found`);
  return (
    <View>
      <EditExpenseForm expense={expense} />
    </View>
  );
};
