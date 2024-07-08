import { EditExpenseForm } from "@/components/EditExpenseForm";
import { View } from "@/components/Themed";
import { FC } from "react";

type Props = {
  id: string;
};

export const EditExpenseScreen: FC<Props> = ({ id }) => {
  return (
    <View>
      <EditExpenseForm id={id} />
    </View>
  );
};
