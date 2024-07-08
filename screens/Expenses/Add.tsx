import { FC } from "react";
import { AddExpenseForm } from "@/components/AddExpenseForm";
import { View } from "@/components/Themed";

export const AddExpenseScreen: FC = () => {
  return (
    <View>
      <AddExpenseForm />
    </View>
  );
};
