import { ScrollView, StyleSheet } from "react-native";
import CalendarPicker, { ChangedDate } from "react-native-calendar-picker";
import { View } from "../Themed";

type Props = {
    start?: Date;
    end?: Date;
    onStartChange: (start: Date) => void
    onEndChange: (end?: Date) => void
}

export const DateRangePicker: React.FC<Props> = ({ start, end, onStartChange, onEndChange }) => {
    const onDateChange = (date: Date, type: ChangedDate) => {
        if (type === "END_DATE") {
            onEndChange(date);
        } else {
            onStartChange(date);
            onEndChange(undefined);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <CalendarPicker
                    startFromMonday
                    allowRangeSelection
                    todayBackgroundColor="#f2e6ff"
                    selectedDayColor="#7300e6"
                    selectedDayTextColor="#FFFFFF"
                    onDateChange={onDateChange}
                    selectedStartDate={start}
                    selectedEndDate={end}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
});
