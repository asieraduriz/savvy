import { FC } from "react";
import { AddTransactionForm } from "@/components/AddTransactionForm";
import { View } from "@/components/Themed";

export const AddTransactionsPage: FC = () => {
  return (
    <View>
      <AddTransactionForm />
    </View>
  );
};
