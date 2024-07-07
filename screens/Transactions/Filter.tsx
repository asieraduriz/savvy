import { Pickers } from "@/components/Pickers";
import { Text, View } from "@/components/Themed";
import { useState } from "react";
import { Button } from "react-native";

export const FilterScreen: React.FC = () => {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>();

    return (
        <View>
            <Pickers.DateRange start={startDate} end={endDate} onStartChange={setStartDate} onEndChange={setEndDate} />
            <Button title="Reset" onPress={() => { setStartDate(new Date()); setEndDate(undefined) }} />
            <Text>Filterss page</Text>
        </View>
    );
};