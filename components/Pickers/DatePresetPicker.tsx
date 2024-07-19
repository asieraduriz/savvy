import { FC } from "react";
import { Text, View } from "../Themed";
import { Pressable, StyleSheet } from "react-native";
import { Dates } from "@/datastructures";

type TimePeriod = "7d" | "30d" | "60d" | string;
type Period = {
  title: TimePeriod;
  start: Date;
  end: Date;
};

type Props = {
  start?: Date;
  end?: Date;
  onDateChange: (start: Date, end?: Date) => void;
};

export const DatePresetPicker: FC<Props> = ({ start, end, onDateChange }) => {
  const now = Dates.Today();

  const periods: Period[] = [
    {
      title: "7d",
      start: Dates.subDays(now, 7),
      end: now,
    },
    {
      title: "30d",
      start: Dates.subDays(now, 30),
      end: now,
    },
    {
      title: "60d",
      start: Dates.subDays(now, 60),
      end: now,
    },
    {
      title: Dates.toMonth(now),
      start: Dates.startOfMonth(now),
      end: now,
    },
    {
      title: Dates.toMonth(Dates.subMonths(now, 1)),
      start: Dates.startOfMonth(Dates.subMonths(now, 1)),
      end: Dates.endOfMonth(Dates.subMonths(now, 1)),
    },
  ];

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
        {periods.map((period) => {
          const isSelected =
            start &&
            end &&
            Dates.isSameDay(period.start, start) &&
            Dates.isSameDay(period.end, end);

          return (
            <Pressable
              key={period.title}
              style={[isSelected && styles.selectedTimePeriod]}
              onPress={() => {
                onDateChange(period.start, period.end);
              }}
            >
              <Text style={[isSelected && styles.selectedTimePeriodText]}>
                {period.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedTimePeriod: {
    backgroundColor: "#007AFF",
  },
  selectedTimePeriodText: {
    color: "#fff",
  },
});
