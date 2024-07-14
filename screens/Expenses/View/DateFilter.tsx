import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Pickers } from "@/components/Pickers";
import { useApplyFilter, useFilter } from "@/contexts";

type Tab = {
  title: string;
  content: React.ReactNode;
};

export const DateFilterScreen: React.FC = () => {
  const { start, end } = useFilter();
  const applyFilter = useApplyFilter();

  const tabs: Tab[] = [
    {
      title: "Preset",
      content: (
        <View>
          <Pickers.DatePreset
            onStartChange={(start) => applyFilter({ start })}
            onEndChange={(end) => applyFilter({ end })}
          />
        </View>
      ),
    },
    {
      title: "Since",
      content: useMemo(
        () => (
          <View>
            <Pickers.Date
              when={start || new Date()}
              set={(startDate: Date) => {
                applyFilter({ start: startDate });
              }}
            />
          </View>
        ),
        [start]
      ),
    },
    {
      title: "Between",
      content: (
        <View style={styles.pickerContainer}>
          <Pickers.DateRange
            start={start}
            end={end}
            onStartChange={(start) => applyFilter({ start })}
            onEndChange={(end) => applyFilter({ end })}
          />
        </View>
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  return (
    <View style={styles.layout}>
      <View>
        <Text>Main content</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.tabList}>
          <ScrollView>
            {tabs.map((tab, index) => (
              <Pressable
                key={index}
                style={[
                  styles.tab,
                  activeTab.title === tab.title && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab.title === tab.title && styles.activeTabText,
                  ]}
                >
                  {tab.title}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <View style={styles.content}>{activeTab.content}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: "column",
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
