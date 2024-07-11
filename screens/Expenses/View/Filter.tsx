import { Pickers } from "@/components/Pickers";
import { Text, View } from "@/components/Themed";
import { useApplyFilter, useFilter } from "@/contexts";
import { Transformers } from "@/transformers";
import { useMemo, useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { DateRange } from "@/types";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";

const useMonthPresets = (): { [key: string]: DateRange } => {
  const now = new Date();

  return {
    [Transformers.showMonth(now, "short")]: {
      start: startOfMonth(now),
      end: endOfMonth(now),
    },
    [Transformers.showMonth(subMonths(now, 1))]: {
      start: startOfMonth(subMonths(now, 1)),
      end: endOfMonth(subMonths(now, 1)),
    },
  };
};

export const FilterScreen: React.FC = () => {
  const filter = useFilter();
  const applyFilter = useApplyFilter();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>();

  const monthPresets = useMemo(useMonthPresets, []);

  return (
    <View>
      <ScrollView>
        {Object.entries(monthPresets).map(([month, { start, end }]) => (
          <Pressables.Toggle
            key={month}
            onPress={(isActive) => {
              onStartChange(isActive ? start : new Date());
              onEndChange(isActive ? end : undefined);
            }}
          >
            <Text>{month}</Text>
          </Pressables.Toggle>
        ))}
        <Pressable
          style={({ pressed }) => [
            styles.pressable,
            pressed && { backgroundColor: "#388E3C" },
          ]}
        >
          <FontAwesome name="calendar" size={24} color="black" />
          <FontAwesome name="chevron-down" size={12} color="black" />
        </Pressable>
        <Pickers.DateRange
          start={filter.start}
          end={filter.end}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
        />

        <Button
          title="Reset"
          onPress={() => {
            setStartDate(new Date());
            setEndDate(undefined);
          }}
        />
        <Text>Filterss page</Text>
        <Pickers.RangeSlider
          min={1}
          max={150}
          step={5}
          onValuesChange={console.log}
        />
        <Text>{Transformers.toFormattedDate(startDate)}</Text>
        <Text>
          {endDate ? Transformers.toFormattedDate(endDate) : "No date"}
        </Text>
        <Button title="Apply" onPress={() => applyFilter(filter)} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pressable: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    backgroundColor: "#4CAF50", // Adjust background color as desired
    borderRadius: 8,
    padding: 16,
    margin: 10,
  },
});
