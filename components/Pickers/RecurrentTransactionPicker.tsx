import { useToggle } from "@/hooks";
import {
  FrequencyRecurrence,
  IntervalRecurrence,
  RecurrentTransaction,
  TransactionRecurrenceTypes,
} from "@/types";
import { StyleSheet, Switch } from "react-native";
import { Text, View } from "../Themed";

const FrequencyTransactionPicker = ({}: {
  recurrence: RecurrentTransaction["recurrence"];
  setRecurrence: (recurrence: FrequencyRecurrence) => void;
}) => {
  return <View />;
};

const IntervalTransactionPicker = ({}: {
  recurrence: RecurrentTransaction["recurrence"];
  setRecurrence: (recurrence: IntervalRecurrence) => void;
}) => {
  return <View />;
};

type Props = {
  recurrence: RecurrentTransaction["recurrence"];
  setRecurrence: (recurrence: RecurrentTransaction["recurrence"]) => void;
};

export const RecurrentTransactionPicker = (props: Props) => {
  const [isFrequency, frequencyToggle] = useToggle(true);
  return (
    <View>
      <View style={styles.switchContainer}>
        <Text style={isFrequency ? styles.disabledRecurrenceText : undefined}>
          Interval
        </Text>
        <Switch value={isFrequency} onValueChange={frequencyToggle.flip} />
        <Text style={isFrequency ? undefined : styles.disabledRecurrenceText}>
          Frequency
        </Text>
      </View>
      {props.recurrence.type === TransactionRecurrenceTypes.frequency ? (
        <FrequencyTransactionPicker {...props} />
      ) : (
        <IntervalTransactionPicker {...props} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  disabledRecurrenceText: {
    color: "grey",
  },
});
