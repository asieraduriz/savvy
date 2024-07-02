import { useState } from "react";
import { Text, TextInput, View } from "../Themed";
import { Button, StyleSheet, Switch } from "react-native";
import { Currency, RecurrentTransaction, SingleTransaction, Transaction } from "@/types";
import { Picker } from "@react-native-picker/picker";
import { CurrencyPicker, RecurrencyPickers } from "../Pickers";
import { Defaults } from "@/constants";

export const AddTransactionForm = () => {
    const [amount, setAmount] = useState<number>(0);
    const [title, setTitle] = useState("");
    const [currency, setCurrency] = useState<Currency["code"]>("USD");
    const [category, setCategory] = useState<Transaction["category"]>("");
    const [otherCategory, setOtherCategory] = useState<Transaction["category"]>("");
    const [isRecurring, setIsRecurring] = useState(false);

    const [singleTransactionDate, setSingleTransactionDate] = useState<SingleTransaction["date"]>(Defaults.SingleTransactionDate);

    const [recurrentTransaction, setRecurrentTransaction] = useState<RecurrentTransaction["recurrence"]>(Defaults.FrequencyRecurrence);

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Title" />
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: "row" }}>
                <View style={{ width: 150, ...styles.input, flex: 1 }}>
                    <CurrencyPicker currency={currency} setCurrency={setCurrency} />
                </View>
                <TextInput style={{ ...styles.input, flex: 1 }} value={`${amount}`} onChangeText={(value) => setAmount(Number(value))} placeholder="Amount" keyboardType="numeric" />
            </View>
            <Picker selectedValue={category} onValueChange={setCategory}>
                <Picker.Item label="Groceries" value="groceries" />
                <Picker.Item label="Rent" value="rent" />
                <Picker.Item label="Utilities" value="utilities" />
                <Picker.Item label="Other" value="other" />
            </Picker>
            {category === "other" && (
                <TextInput style={styles.input} value={otherCategory} onChangeText={setOtherCategory} placeholder="Please add a new category" />
            )}
            <View style={styles.switchContainer}>
                <Text style={isRecurring ? styles.disabledRecurrenceText : undefined}>One-time</Text>
                <Switch value={isRecurring} onValueChange={setIsRecurring} />
                <Text style={isRecurring ? undefined : styles.disabledRecurrenceText}>Recurrent</Text>
            </View>
            {
                isRecurring ? (
                    <RecurrencyPickers.Recurrent recurrence={recurrentTransaction} setRecurrence={setRecurrentTransaction} />
                ) : (
                    <RecurrencyPickers.Single occurrence={singleTransactionDate} setRecurrence={setSingleTransactionDate} />
                )
            }

            <Button title="Add Transaction" onPress={() => { }} />
        </View >
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
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    disabledRecurrenceText: {
        color: 'grey'
    }
});
