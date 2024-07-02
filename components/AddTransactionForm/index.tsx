import { useState } from "react";
import { Text, TextInput, View } from "../Themed";
import { Button, StyleSheet, Switch } from "react-native";
import {
    Currency,
    RecurrentTransaction,
    SingleTransaction,
    Transaction,
    TransactionRecurrenceTypes,
} from "@/types";
import { Picker } from "@react-native-picker/picker";
import { CurrencyPicker, RecurrencyPickers } from "../Pickers";

export const AddTransactionForm = () => {
    const [amount, setAmount] = useState<number>(0);
    const [title, setTitle] = useState("");
    const [currency, setCurrency] = useState<Currency["code"]>("USD");
    const [category, setCategory] = useState<Transaction["category"]>("");
    const [otherCategory, setOtherCategory] =
        useState<Transaction["category"]>("");
    const [isRecurring, setIsRecurring] = useState(false);

    const [singleTransactionDate, setSingleTransactionDate] = useState<SingleTransaction["date"]>();

    const [recurrentTransaction, setRecurrentTransaction] = useState<
        RecurrentTransaction["recurrence"]
    >({
        type: TransactionRecurrenceTypes.frequency,
        frequency: "daily",
        startDate: new Date(),
    });

    return (
        <View style={styles.container}>
            <CurrencyPicker currency={currency} setCurrency={setCurrency} />

            <TextInput
                value={`${amount}`}
                onChangeText={(value) => setAmount(Number(value))}
                placeholder="Amount"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Title"
            />
            <Picker selectedValue={category} onValueChange={setCategory}>
                <Picker.Item label="Groceries" value="groceries" />
                <Picker.Item label="Rent" value="rent" />
                <Picker.Item label="Utilities" value="utilities" />
                <Picker.Item label="Other" value="other" />
            </Picker>
            {category === "other" && (
                <TextInput
                    style={styles.input}
                    value={otherCategory}
                    onChangeText={setOtherCategory}
                    placeholder="Please add a new category"
                />
            )}
            <View style={styles.switchContainer}>
                <Text>Recurring?</Text>
                <Switch value={isRecurring} onValueChange={setIsRecurring} />
            </View>
            {isRecurring ? (
                <RecurrencyPickers.Recurrent
                    recurrence={recurrentTransaction}
                    setRecurrence={setRecurrentTransaction}
                />
            ) : (
                <RecurrencyPickers.Single
                    occurrence={singleTransactionDate}
                    setRecurrence={setSingleTransactionDate}
                />
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
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
});
