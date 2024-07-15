import { Pickers } from "@/components/Pickers";
import { Text, TextInput, View } from "@/components/Themed";
import { useApplyFilter, useFilter } from "@/contexts";
import { useRef, useState } from "react";
import {
  Animated,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Dates } from "@/datastructures";

export const FilterScreen: React.FC = () => {
  const filter = useFilter();
  const applyFilter = useApplyFilter();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>();

  const [isExpanded, setIsExpanded] = useState(false);
  const animatedWidth = useRef(new Animated.Value(40)).current;

  const toggleSearch = () => {
    const toValue = isExpanded ? 40 : 200;
    Animated.spring(animatedWidth, {
      toValue,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <ScrollView>
        <Animated.View style={[styles.searchBox, { width: animatedWidth }]}>
          <Pressable
            onPress={toggleSearch}
            style={({ pressed }) => [
              styles.iconContainer,
              { opacity: pressed ? 0.5 : 1 },
            ]}
          >
            <Ionicons name="search" size={24} color="black" />
          </Pressable>
          {isExpanded && (
            <TextInput
              style={styles.input}
              placeholder="Search..."
              autoFocus
              onBlur={toggleSearch}
            />
          )}
        </Animated.View>

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
        <Text>{Dates.readable(startDate)}</Text>
        <Text>{endDate ? Dates.readable(endDate) : "No date"}</Text>
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
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    overflow: "hidden",
  },
  iconContainer: {
    padding: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingRight: 8,
  },
});
