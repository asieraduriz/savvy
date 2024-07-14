import { FC, useState } from "react";
import { Text, View } from "../Themed";
import { endOfMonth, startOfMonth, subDays, subMonths } from "date-fns";
import { Pressable, StyleSheet } from "react-native";
import { Transformers } from "@/transformers";

type Props = {
  onStartChange: (start: Date) => void;
  onEndChange: (end?: Date) => void;
};

type TimePeriod = "7d" | "30d" | "60d" | string;
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
      <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
        {periods.map((period) => (
          <Pressable
            key={period.title}
            style={[
              selectedPeriod?.title === period.title &&
                styles.selectedTimePeriod,
            ]}
            onPress={() => onSelectPeriod(period)}
          >
            <Text
              style={[
                selectedPeriod?.title === period.title &&
                  styles.selectedTimePeriodText,
              ]}
            >
              {period.title}
            </Text>
          </Pressable>
        ))}
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
  selectedTimePeriod: {
    backgroundColor: "#007AFF",
  },
  selectedTimePeriodText: {
    color: "#fff",
  },
});
