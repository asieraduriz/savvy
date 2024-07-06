import { useState } from "react";
import { Text, TextInput, View } from "../Themed";
import { StyleSheet, Switch } from "react-native";
import { UnifiedAddTransaction } from "@/types";
import { CurrencyPicker, OccurrencyPickers } from "../Pickers";
import { Defaults } from "@/constants";
import { AddTransactionButton } from "./AddTransactionButton";

const toNumber = (input: string, fallback: number) =>
  Number.isNaN(Number(input)) ? fallback : Number(input);

export const AddTransactionForm = () => {
  const [transaction, setTransaction] = useState<UnifiedAddTransaction>(
    Defaults.TransactionForm
  );

  const isRecurring = transaction.type === "recurrent";
  const set = (key: keyof UnifiedAddTransaction, value: any) => {
    setTransaction((prev) => ({ ...prev, [key]: value }));
  };

  const { title, currency, amount, category, when: date } = transaction;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(title) => set("title", title)}
        placeholder="Title"
      />
      <View
        style={{ display: "flex", alignItems: "center", flexDirection: "row" }}
      >
        <View style={{ width: 150, ...styles.input, flex: 1 }}>
          <CurrencyPicker
            currency={currency}
            setCurrency={(currency) => set("currency", currency)}
          />
        </View>
        <TextInput
          style={{ ...styles.input, flex: 1 }}
          value={`${amount}`}
          onChangeText={(value) => set("amount", toNumber(value, amount))}
          placeholder="Amount"
          keyboardType="numeric"
        />
      </View>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={(category) => set("category", category)}
        placeholder="Which category?"
      />
      <View style={styles.switchContainer}>
        <Text style={isRecurring ? styles.disabledRecurrenceText : undefined}>
          One-time
        </Text>
        <Switch
          value={isRecurring}
          onValueChange={(value) => set("type", value ? "recurrent" : "single")}
        />
        <Text style={isRecurring ? undefined : styles.disabledRecurrenceText}>
          Recurrent
        </Text>
      </View>
      {isRecurring ? (
        <OccurrencyPickers.Recurrent
          transaction={transaction}
          setTransaction={setTransaction}
        />
      ) : (
        <OccurrencyPickers.Single
          occurrence={date}
          setRecurrence={(when) => set("when", when)}
        />
      )}

      <AddTransactionButton transaction={transaction} />
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
