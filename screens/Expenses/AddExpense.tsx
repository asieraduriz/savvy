import { FC } from "react";
import { AddExpenseForm } from "@/components/AddExpenseForm";
import { View } from "@/components/Themed";
import { Defaults } from "@/constants";

export const AddExpenseScreen: FC = () => {
  return (
    <View>
      <AddExpenseForm initialExpense={Defaults.Add.OneTimeExpense} />
    </View>
  );
};
