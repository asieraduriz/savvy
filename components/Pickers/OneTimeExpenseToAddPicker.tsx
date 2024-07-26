import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { useToggle } from "@/hooks";
import { Dates } from "@/datastructures";

type Props = {
  when: Date;
  setDate: (date: Date) => void;
};

export const OneTimeExpenseToAddPicker: React.FC<Props> = ({
  when,
  setDate,
}) => {
  const [showDatePicker, toggle] = useToggle(false);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    toggle.off();
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressableDateContainer} onPress={toggle.on}>
        <Text style={styles.dateText}>{Dates.readable(when)}</Text>
        <MaterialIcons name="event" size={24} color="black" />
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={when || Dates.Today()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
