import { useState } from "react";
import { Text, TextInput, View } from "../Themed";
import { StyleSheet, Switch } from "react-native";
import { ExpenseToAdd } from "@/types";
import { CurrencyPicker, Pickers } from "../Pickers";
import { Defaults } from "@/constants";
import { Submit } from "./Submit";

const toNumber = (input: string, fallback: number) =>
  Number.isNaN(Number(input)) ? fallback : Number(input);

export const AddExpenseForm = () => {
  const [expenseToAdd, setExpense] = useState<ExpenseToAdd>(Defaults.AddExpenseForm);

  const isOneTime = expenseToAdd.type === "onetime";
  const set = (key: keyof ExpenseToAdd, value: any) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const { title, currency, amount, category, when: date } = expenseToAdd;

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
        <Text style={isOneTime ? styles.disabledRecurrenceText : undefined}>
          One-time
        </Text>
        <Switch
          value={isOneTime}
          onValueChange={(value) => set("type", value ? "recurrent" : "single")}
        />
        <Text style={isOneTime ? undefined : styles.disabledRecurrenceText}>
          Recurrent
        </Text>
      </View>
      {isOneTime ? (
        <Pickers.Subscription
          expenseToAdd={expenseToAdd}
          updateExpense={setExpense}
        />
      ) : (
        <Pickers.OneTime
          occurrence={date}
          setRecurrence={(when) => set("when", when)}
        />
      )}

      <Submit expenseToAdd={expenseToAdd} />
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
