import { useToggle } from "@/hooks";
import { RecurrentTransactionFrequency, UnifiedAddTransaction } from "@/types";
import { Pressable, StyleSheet } from "react-native";
import { Text, TextInput, View } from "../Themed";
import { format } from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

type Props = {
  transaction: UnifiedAddTransaction;
  setTransaction: React.Dispatch<React.SetStateAction<UnifiedAddTransaction>>;
};

export const RecurrentTransactionPicker = ({
  transaction: recurrence,
  setTransaction: setRecurrence,
}: Props) => {
  const [showDatePicker, toggle] = useToggle(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    toggle.off();
    if (event.type === "set" && selectedDate) {
      setRecurrence({ ...recurrence, startDate: selectedDate });
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressableDateContainer} onPress={toggle.on}>
        <Text style={styles.dateText}>
          Starting {format(recurrence.startDate, "MMM do yyyy")}
        </Text>
        <MaterialIcons name="event" size={24} color="black" />
      </Pressable>
      <View>
        <Text>Every</Text>
        <TextInput
          value={`${recurrence.every}`}
          onChangeText={(every) =>
            setRecurrence({ ...recurrence, every: Number(every) })
          }
          placeholder="Amount"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={recurrence.frequency}
          onValueChange={(frequency: RecurrentTransactionFrequency) =>
            setRecurrence({ ...recurrence, frequency })
          }
        >
          {Object.values(RecurrentTransactionFrequency).map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={recurrence.startDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
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
  container: {
    padding: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateText: {
    fontSize: 16,
    marginRight: 10,
  },
  pressableDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
