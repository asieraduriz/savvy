import { useState } from "react";
import { Button } from "react-native";
import { View } from "../Themed";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  occurrence: Date;
  setRecurrence: (date: Date) => void;
};

export const SingleTransactionPicker = ({
  occurrence,
  setRecurrence,
}: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <View>
      <Button title="Choose the date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={occurrence}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (event.type === "set") {
              setRecurrence(selectedDate || occurrence);
            }
          }}
        />
      )}
    </View>
  );
};
