import { FC, useState } from "react";
import { Text, View } from "../Themed";
import { endOfMonth, startOfMonth, subDays, subMonths } from "date-fns";
import { Pressable, StyleSheet } from "react-native";
import { Transformers } from "@/transformers";

type Props = {
  onStartChange: (start: Date) => void;
  onEndChange: (end?: Date) => void;
};

type TimePeriod = "7d" | "30d" | "60d" | "90d" | string;
type Period = {
  title: TimePeriod;
  start: Date;
  end: Date;
};

const now = new Date();

const periods: Period[] = [
  {
    title: "7d",
    start: subDays(now, 7),
    end: now,
  },
  {
    title: "30d",
    start: subDays(now, 30),
    end: now,
  },
  {
    title: "60d",
    start: subDays(now, 60),
    end: now,
  },
  {
    title: "90d",
    start: subDays(now, 90),
    end: now,
  },
  {
    title: Transformers.toMonth(now, "short"),
    start: startOfMonth(now),
    end: now,
  },
  {
    title: Transformers.toMonth(subMonths(now, 1), "short"),
    start: startOfMonth(subMonths(now, 1)),
    end: endOfMonth(subMonths(now, 1)),
  },
];

export const DatePresetPicker: FC<Props> = ({ onStartChange, onEndChange }) => {
  const [selectedPeriod, onSelectPeriod] = useState<Period>();

  return (
    <View>
      <View style={styles.timePeriodContainer}>
        <View>
          {periods.map((period) => (
            <Pressable
              key={period.title}
              style={[
                styles.timePeriodButton,
                selectedPeriod?.title === period.title &&
                  styles.selectedTimePeriod,
              ]}
              onPress={() => onSelectPeriod(period)}
            >
              <Text
                style={[
                  styles.timePeriodText,
                  selectedPeriod?.title === period.title &&
                    styles.selectedTimePeriodText,
                ]}
              >
                {period.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      {selectedPeriod?.start && selectedPeriod?.end ? (
        <View>
          <Text>
            From: {Transformers.toFormattedDate(selectedPeriod.start)}
          </Text>
          <Text>To: {Transformers.toFormattedDate(selectedPeriod.end)}</Text>
        </View>
      ) : undefined}
    </View>
  );
};

const styles = StyleSheet.create({
  timePeriodContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  timePeriodButton: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  selectedTimePeriod: {
    backgroundColor: "#007AFF",
  },
  timePeriodText: {
    fontSize: 16,
  },
  selectedTimePeriodText: {
    color: "#fff",
  },
});
