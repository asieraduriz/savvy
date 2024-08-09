import { FC, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
} from "react-native";
import { Pickers } from "@/components/Pickers";
import { useApplyFilter, useFilter } from "@/contexts";
import { Calendar } from "react-native-calendars";
import { Dates } from "@/datastructures";

type Tab = "Since" | "Between";

export const DateFilter: React.FC = () => {
    const [initialCalendarDate] = useState(
        Dates.toFormat(Dates.Today())
    );
    const { start, end } = useFilter();
    const applyFilter = useApplyFilter();
    const [activeTab, setActiveTab] = useState<Tab>("Between");

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
                    <Calendar
                        hideExtraDays
                        maxDate={Dates.toFormat(Dates.Today())}
                        initialDate={initialCalendarDate}
                        enableSwipeMonths
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
