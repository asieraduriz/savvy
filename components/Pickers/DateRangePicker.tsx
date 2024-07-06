import { useState } from "react";
import { StyleSheet } from "react-native";
import CalendarPicker, { ChangedDate } from "react-native-calendar-picker";
import { Text, View } from "../Themed";

export const DateRangePicker = () => {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const onDateChange = (date: Date, type: ChangedDate) => {
        if (type === "END_DATE") {
            setEndDate(date);
        } else {
            setStartDate(date);
            setEndDate(undefined);
        }
    };

    return (
        <View style={styles.container}>
            <CalendarPicker
                startFromMonday
                allowRangeSelection
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
            />
            <View>
                <Text>SELECTED START DATE:{`${startDate}`}</Text>
                <Text>SELECTED END DATE:{`${endDate}`}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        marginTop: 100,
        height: 250
    },
});
