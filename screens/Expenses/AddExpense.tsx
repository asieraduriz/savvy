import { FC } from "react";
import { View } from "@/components/Themed";
import { Defaults, Forms } from "@/constants";

export const AddExpenseScreen: FC = () => {
  return (
    <View>
      <Forms.AddSpending initialExpense={Defaults.Add.OneTimeExpense} />
    </View>
  );
};
