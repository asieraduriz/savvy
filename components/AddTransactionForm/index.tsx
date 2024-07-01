import { useState } from "react";
import { Text, TextInput, View } from "../Themed";
import { Button, StyleSheet, Switch } from "react-native";
import { Transaction, TransactionRecurrenceTypes } from "@/types";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SearchablePicker } from "../SearchablePicker";

export const AddTransactionForm = () => {
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<Transaction["category"]>('');
    const [otherCategory, setOtherCategory] = useState<Transaction["category"]>('');
    const [showDate, setShowDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [type, setType] = useState<string>('expense');

    const [isRecurring, setIsRecurring] = useState(false);
    const [recurringType, setRecurringType] = useState<TransactionRecurrenceTypes>(TransactionRecurrenceTypes.frequency);

    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                {/* TODO: Add currencies */}
                <Picker
                    selectedValue={currency}
                    onValueChange={setCurrency}
                >

                    {/* <Picker.Item label="Other" value="other" /> */}
                </Picker>
                <TextInput
                    value={`${amount}`}
                    onChangeText={(value) => setAmount(Number(value))}
                    placeholder="Amount"
                    keyboardType="numeric"
                />

            </View>
            <View style={{ padding: 48 }} />
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
            />
            <Picker
                selectedValue={category}
                onValueChange={setCategory}
            >
                <Picker.Item label="Groceries" value="groceries" />
                <Picker.Item label="Rent" value="rent" />
                <Picker.Item label="Utilities" value="utilities" />
                <Picker.Item label="Other" value="other" />
            </Picker>
            {
                category === 'other' &&
                <TextInput
                    style={styles.input}
                    value={otherCategory}
                    onChangeText={setOtherCategory}
                    placeholder="Please add a new category"
                />
            }
            <Button title="Choose the date" onPress={() => setShowDate(true)} />
            {
                showDate &&
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(_, selectedDate) => {
                        setShowDate(false);
                        setDate(selectedDate || date);
                    }}
                />
            }
            <View style={styles.switchContainer}>
                <Text>Recurring?</Text>
                <Switch value={isRecurring} onValueChange={setIsRecurring} />
            </View>
            {isRecurring && (
                <View>
                    <Text>Is recurring</Text>
                </View>
            )}
            <Button title="Add Transaction" onPress={() => { }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});