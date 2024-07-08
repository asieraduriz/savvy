import { useToggle } from "@/hooks";
import { ExpenseToAdd, SubscriptionExpenseFrequency } from "@/types";
import { Pressable, StyleSheet } from "react-native";
import { Text, TextInput, View } from "../Themed";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Transformers } from "@/transformers";

type Props = {
  expenseToAdd: ExpenseToAdd;
  updateExpense: React.Dispatch<React.SetStateAction<ExpenseToAdd>>;
};

export const SubscriptionToAddPicker = ({
  expenseToAdd: expense,
  updateExpense,
}: Props) => {
  const [showDatePicker, toggle] = useToggle(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    toggle.off();
    if (event.type === "set" && selectedDate) {
      updateExpense({ ...expense, startDate: selectedDate });
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressableDateContainer} onPress={toggle.on}>
        <Text style={styles.dateText}>
          Starting {Transformers.toFormattedDate(expense.startDate)}
        </Text>
        <MaterialIcons name="event" size={24} color="black" />
      </Pressable>
      <View>
        <Text>Every</Text>
        <TextInput
          value={`${expense.every}`}
          onChangeText={(every) =>
            updateExpense({ ...expense, every: Number(every) })
          }
          placeholder="Amount"
          keyboardType="numeric"
        />
        <Picker
          selectedValue={expense.frequency}
          onValueChange={(frequency: SubscriptionExpenseFrequency) =>
            updateExpense({ ...expense, frequency })
          }
        >
          {Object.values(SubscriptionExpenseFrequency).map((item) => (
            <Picker.Item key={item} label={item} value={item} />
          ))}
        </Picker>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={expense.startDate}
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
