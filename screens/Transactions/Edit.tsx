import { EditTransactionForm } from "@/components/EditTransactionForm";
import { View } from "@/components/Themed";
import { FC } from "react";

type Props = {
  id: string;
};

export const EditTransactionsScreen: FC<Props> = ({ id }) => {
  return (
    <View>
      <EditTransactionForm id={id} />
    </View>
  );
};
