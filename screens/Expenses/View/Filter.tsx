import { Pickers } from "@/components/Pickers";
import { Text, View } from "@/components/Themed";
import { useApplyFilter, useFilter } from "@/contexts";
import { Transformers } from "@/transformers";
import { useState } from "react";
import { Button, Pressable, ScrollView, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { subMonths } from "date-fns";

export const FilterScreen: React.FC = () => {
  const filter = useFilter();
  const applyFilter = useApplyFilter();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>();

  return (
    <View>
      <ScrollView>
        <Pressable onPress={console.log}>
          <Text>1w</Text>
        </Pressable>
        <Pressable onPress={console.log}>
          <Text>1m</Text>
        </Pressable>
        <Pressable onPress={console.log}>
          <Text>2m</Text>
        </Pressable>
        <Pressable onPress={console.log}>
          <Text>1y</Text>
        </Pressable>
        <Text>-----------------------</Text>
        <Pressable onPress={console.log}>
          <Text>{Transformers.showMonth(new Date(), "short")}</Text>
        </Pressable>
        <Pressable onPress={console.log}>
          <Text>
            {Transformers.showMonth(subMonths(new Date(), 1), "short")}
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.pressable,
            pressed && { backgroundColor: "#388E3C" }, // Darken on press
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
        <Pickers.DatePreset
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
