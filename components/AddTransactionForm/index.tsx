import { useState } from "react";
import { Text, TextInput, View } from "../Themed";
import { Button, StyleSheet, Switch } from "react-native";
import { RecurrentTransaction, SingleTransaction, Transaction } from "@/types";
import { Picker } from "@react-native-picker/picker";
import { CurrencyPicker, RecurrencyPickers } from "../Pickers";
import { Defaults } from "@/constants";
import { useToggle } from "@/hooks";

export const AddTransactionForm = () => {
    const [isRecurring, recurringToggle] = useToggle(false);

    const [singleTransaction, setSingleTransaction] = useState<SingleTransaction>(Defaults.SingleTransactionDate);
    const [recurrentTransaction, setRecurrentTransaction] = useState<RecurrentTransaction>(Defaults.RecurrentTransaction);

    const set = (key: keyof SingleTransaction | keyof RecurrentTransaction, value: any) => {
        if (isRecurring) {
            setRecurrentTransaction((prev) => ({ ...prev, [key]: value }))
        } else {
            setSingleTransaction((prev) => ({ ...prev, [key]: value }))
        }
    }

    const { title, currency, amount, category } = isRecurring ? recurrentTransaction : singleTransaction;
    const [otherCategory, setOtherCategory] = useState<Transaction["category"]>("");

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={title} onChangeText={(title) => set('title', title)} placeholder="Title" />
            <View style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                <View style={{ width: 150, ...styles.input, flex: 1 }}>
                    <CurrencyPicker currency={currency} setCurrency={(currency) => set('currency', currency)} />
                </View>
                <TextInput
                    style={{ ...styles.input, flex: 1 }}
                    value={`${amount}`}
                    onChangeText={(value) => set('amount', Number(value))}
                    placeholder="Amount"
                    keyboardType="numeric"
                />
            </View>
            <Picker selectedValue={category} onValueChange={(category) => set('category', category)}>
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
                <Switch value={isRecurring} onValueChange={recurringToggle.flip} />
                <Text style={isRecurring ? undefined : styles.disabledRecurrenceText}>Recurrent</Text>
            </View>
            {isRecurring ? (
                <RecurrencyPickers.Recurrent recurrence={recurrentTransaction} setRecurrence={setRecurrentTransaction} />
            ) : (
                <RecurrencyPickers.Single occurrence={singleTransaction.date} setRecurrence={(date) => setSingleTransaction((prev) => ({ ...prev, date }))} />
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
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    disabledRecurrenceText: {
        color: "grey",
    },
});
