import { useState } from "react";
import { Text, TextInput, View } from "../Themed";
import { Button, StyleSheet, Switch } from "react-native";
import { Transaction, UnifiedAddTransaction } from "@/types";
import { CurrencyPicker, OccurrencyPickers } from "../Pickers";
import { Defaults } from "@/constants";
import { useToggle } from "@/hooks";
import { useAddTransaction } from "@/contexts";
import { randomUUID } from "expo-crypto";

const toNumber = (input: string, fallback: number) =>
  Number.isNaN(Number(input)) ? fallback : Number(input);

export const AddTransactionForm = () => {
  const addTransaction = useAddTransaction();
  const [isRecurring, recurringToggle] = useToggle(false);
  const [transaction, setTransaction] = useState<UnifiedAddTransaction>(
    Defaults.TransactionForm
  );

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
        <Switch value={isRecurring} onValueChange={recurringToggle.flip} />
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

      <Button
        title="Add Transaction"
        onPress={() => {
          const created = new Date();

          if (isRecurring) {
            const { when: date, ...newTransaction } = transaction;
            const recurrentTransaction: Transaction = {
              ...newTransaction,
              created,
              id: randomUUID(),
              type: "recurrent",
            };

            addTransaction(recurrentTransaction);
            alert(
              `Recurrent transaction id: ${
                recurrentTransaction.id
              } - ${JSON.stringify(recurrentTransaction)}`
            );
          } else {
            const { every, startDate, frequency, ...newTransaction } =
              transaction;

            const singleTransaction: Transaction = {
              ...newTransaction,
              created,
              id: randomUUID(),
              type: "single",
            };

            addTransaction(singleTransaction);

            alert(
              `Single transaction id: ${
                singleTransaction.id
              } - ${JSON.stringify(singleTransaction)}`
            );
          }
        }}
      />
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
