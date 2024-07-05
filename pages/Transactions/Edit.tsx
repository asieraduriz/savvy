import { EditTransactionForm } from "@/components/EditTransactionForm";
import { View } from "@/components/Themed";
import { FC } from "react";

type Props = {
  id: string;
};

export const EditTransactionsPage: FC<Props> = ({ id }) => {
  return (
    <View>
      <EditTransactionForm id={id} />
    </View>
  );
};
