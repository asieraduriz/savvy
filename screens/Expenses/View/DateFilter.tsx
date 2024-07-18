import { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  LayoutChangeEvent,
  Dimensions,
  Button,
} from "react-native";
import { Pickers } from "@/components/Pickers";
import { useApplyFilter, useFilter } from "@/contexts";
import { Calendar } from "react-native-calendars";
import { Dates } from "@/datastructures";

type Tab = "Since" | "Between";

export const DateFilterScreen: React.FC = () => {
  const [initialCalendarDate, sendCalendarToDate] = useState(
    Dates.toFormat(Dates.Now())
  );
  const { start, end } = useFilter();
  const applyFilter = useApplyFilter();
  const [calendarMonth, setCalendarMonth] = useState<number>(0);

  const [contentWidth, setContentWidth] = useState(
    Dimensions.get("screen").width
  );

  const onTabLayout = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    setContentWidth(layout.width);
  };

  const [activeTab, setActiveTab] = useState<Tab>("Between");

  const onDayPressed = (date: Date) => {
    if (activeTab === "Since") {
      applyFilter({ start: date, end: Dates.Now() });

      // updateMarkedDates(selectedDate, formatDate(new Date()));
    } else {
      if (!start || (start && end)) {
        applyFilter({ start: date, end: undefined });

        // updateMarkedDates(selectedDate, null);
      } else {
        if (Dates.isAfter(date, start)) {
          applyFilter({ end: date });
          // updateMarkedDates(start, selectedDate);
        } else {
          applyFilter({ start: date, end: start });

          // updateMarkedDates(selectedDate, start);
        }
      }
    }
  };

  return (
    <View style={styles.layout}>
      <Text>Quick actions</Text>
      <Pickers.DatePreset
        start={start}
        end={end}
        onDateChange={(startDate, endDate) =>
          applyFilter({ start: startDate, end: endDate })
        }
      />
      {start && end && (
        <Text>
          {Dates.toFormat(start)} - {Dates.toFormat(end)}
        </Text>
      )}
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: "#ccc",
          marginLeft: 12,
          marginRight: 12,
        }}
      />

      <View style={styles.container}>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <View style={styles.content}>
          <Button
            title="Now"
            onPress={() => {
              const now = Dates.Now();
              const tomorrow = sendCalendarToDate(
                Dates.toFormat(Dates.Tomorrow())
              );
            }}
          />
          <Calendar
            showSixWeeks
            maxDate={Dates.toFormat(Dates.Now())}
            initialDate={initialCalendarDate}
            enableSwipeMonths
            onMonthChange={({ month }) => setCalendarMonth(month)}
            onDayPress={({ dateString }) => onDayPressed(Dates.At(dateString))}
          />
        </View>
      </View>
    </View>
  );
};

const tabTitles: Tab[] = ["Between", "Since"];

const Tabs: FC<{
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}> = ({ activeTab, setActiveTab }) => (
  <View style={styles.tabList}>
    <ScrollView>
      {tabTitles.map((title) => (
        <Pressable
          key={title}
          style={[styles.tab, activeTab === title && styles.activeTab]}
          onPress={() => setActiveTab(title)}
        >
          <Text
            style={[styles.tabText, title === title && styles.activeTabText]}
          >
            {title}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: "column",
    gap: 12,
  },
  container: {
    flex: 1,
    flexDirection: "row",
  },
  tabList: {
    backgroundColor: "#f0f0f0",
  },
  tab: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  activeTab: {
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  pickerContainer: {
    width: "80%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 50,
  },
});
