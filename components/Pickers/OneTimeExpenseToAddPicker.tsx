import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { useToggle } from "@/hooks";
import { Transformers } from "@/transformers";

type Props = {
  occurrence: Date;
  setRecurrence: (date: Date) => void;
};

export const OneTimeExpenseToAddPicker: React.FC<Props> = ({
  occurrence,
  setRecurrence,
}) => {
  const [showDatePicker, toggle] = useToggle(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    toggle.off();
    if (event.type === "set" && selectedDate) {
      setRecurrence(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressableDateContainer} onPress={toggle.on}>
        <Text style={styles.dateText}>
          {Transformers.toFormattedDate(occurrence)}
        </Text>
        <MaterialIcons name="event" size={24} color="black" />
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={occurrence || new Date()}
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
