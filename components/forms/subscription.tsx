import { Subscription, Currencies } from "@/types";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Button, Pressable, StyleSheet } from "react-native";
import { Text, TextInput, View } from "../Themed"
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
    initial: Subscription;
    onSubmit: (subscription: Subscription) => void;
}

export const SubscriptionForm = ({ initial, onSubmit }: Props) => {
    const [cost, setCost] = useState<Subscription["cost"]>(initial.cost || '');
    const [name, setName] = useState<Subscription["name"]>(initial.name || '');
    const [currency, setCurrency] = useState<Subscription["currency"]>(initial.currency || "€");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [startDate, setStartDate] = useState<Subscription["startDate"]>(initial.startDate || new Date());
    const [everyWeeks, setEveryWeeks] = useState<Subscription["everyWeeks"]>(initial.everyWeeks || "4");
    const [notes, setNotes] = useState<Subscription["notes"]>(initial.notes || '');

    const onPressAdd = () => {
        onSubmit({
            id: initial.id,
            name,
            cost,
            currency,
            startDate,
            everyWeeks,
            notes
        })
    }
    return (
        <View style={styles.container}>
            <TextInput placeholder="Subscription name" value={name} onChangeText={setName} />
            <TextInput placeholder="Subscription cost" keyboardType="numeric" value={cost} onChangeText={setCost} />
            <Picker selectedValue={currency} onValueChange={setCurrency} style={{ width: 150 }}>
                {
                    Currencies.map(({ name, sign }) =>
                        <Picker.Item label={sign} value={name} key={name} />
                    )
                }
            </Picker>
            <Button title="Start date" onPress={() => setShowDatePicker(true)} />
            {
                showDatePicker ?
                    <DateTimePicker mode="date" value={startDate} onChange={(_, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) setStartDate(selectedDate)
                    }} />
                    : null
            }
            <Text>
                {startDate.getDate()}{' '}{startDate.getMonth() + 1}{' '}{startDate.getFullYear()}
            </Text>
            <TextInput placeholder="Every X weeks" value={everyWeeks} keyboardType="numeric" maxLength={1} onChangeText={(input) => {
                if (/^[1-9]$/.test(input) || input === "") {
                    setEveryWeeks(input);
                }
            }} />
            <TextInput placeholder="Notes" value={notes} onChangeText={setNotes} />
            <Pressable onPress={() => onPressAdd()} >
                <Text>Add</Text>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
