import { RecurrentTransaction } from "@/types";
import { View } from "../Themed";

type Props = {
  recurrence: RecurrentTransaction["recurrence"];
  setRecurrence: (recurrence: RecurrentTransaction["recurrence"]) => void;
};

export const RecurrentTransactionPicker = ({ }: Props) => {

  return (
    <View>

    </View>
  )
}
