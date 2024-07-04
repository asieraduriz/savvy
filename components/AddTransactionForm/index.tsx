import { useState } from "react";
import { Text, TextInput, View } from "../Themed";
import { Button, StyleSheet, Switch } from "react-native";
import { UnifiedAddTransaction } from "@/types";
import { Picker } from "@react-native-picker/picker";
import { CurrencyPicker, RecurrencyPickers } from "../Pickers";
import { Defaults } from "@/constants";
import { useToggle } from "@/hooks";

const toNumber = (input: string, fallback: number) => Number.isNaN(Number(input)) ? fallback : Number(input);

export const AddTransactionForm = () => {
    const [isRecurring, recurringToggle] = useToggle(false);
    const [transaction, setTransaction] = useState<UnifiedAddTransaction>(Defaults.TransactionForm);

    const set = (key: keyof UnifiedAddTransaction, value: any) => {
        setTransaction((prev) => ({ ...prev, [key]: value }));
    }

    const { title, currency, amount, category, otherCategory, date } = transaction;

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
                    onChangeText={(value) => set('amount', toNumber(value, amount))}
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
                <TextInput style={styles.input} value={otherCategory} onChangeText={(otherCategory) => set('otherCategory', otherCategory)} placeholder="Please add a new category" />
            )}
            <View style={styles.switchContainer}>
                <Text style={isRecurring ? styles.disabledRecurrenceText : undefined}>One-time</Text>
                <Switch value={isRecurring} onValueChange={recurringToggle.flip} />
                <Text style={isRecurring ? undefined : styles.disabledRecurrenceText}>Recurrent</Text>
            </View>
            {isRecurring ? (
                <RecurrencyPickers.Recurrent transaction={transaction} setTransaction={setTransaction} />
            ) : (
                <RecurrencyPickers.Single occurrence={date} setRecurrence={(date) => set('date', date)} />
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
