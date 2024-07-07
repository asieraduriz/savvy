import { Pickers } from "@/components/Pickers";
import { Text, View } from "@/components/Themed";
import { useApplyFilter, useFilter } from "@/contexts";
import { format } from "date-fns";
import { useState } from "react";
import { Button, ScrollView } from "react-native";

export const FilterScreen: React.FC = () => {
    const filter = useFilter()
    const applyFilter = useApplyFilter();
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>();

    return (
        <View>
            <ScrollView>
                <Pickers.DateRange start={filter.start} end={filter.end} onStartChange={setStartDate} onEndChange={setEndDate} />
                <Pickers.DatePreset onStartChange={setStartDate} onEndChange={setEndDate} />
                <Button title="Reset" onPress={() => { setStartDate(new Date()); setEndDate(undefined) }} />
                <Text>Filterss page</Text>
                <Text>{format(startDate, 'MMM do yyyy')}</Text>
                <Text>{endDate ? format(endDate, 'MMM do yyyy') : "No date"}</Text>
                <Button title="Apply" onPress={() => applyFilter(filter)} />
            </ScrollView>
        </View>
    );
};