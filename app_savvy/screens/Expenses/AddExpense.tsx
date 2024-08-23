import { FC } from "react";
import { View } from "@/components/Themed";
import { Defaults } from "@/constants";
import { Forms } from "@/components";

export const AddExpenseScreen: FC = () => {
  return (
    <View>
      <Forms.AddSpending initialExpense={Defaults.Add.OneTimeExpense} />
    </View>
  );
};
