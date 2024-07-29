import { useState } from "react";
import { Text, TextInput, View } from "../Themed";
import { StyleSheet, Switch } from "react-native";
import { ExpenseToAdd } from "@/types";
import { Pickers } from "../Pickers";
import { Defaults } from "@/constants";
import { Submit } from "./Submit";
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const IconFamilies = {
  MaterialCommunityIcons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json"),
};

const Colors = ["white", "orange", "red", "blue", "yellow", "pink"];

const toNumber = (input: string, fallback: number) =>
  Number.isNaN(Number(input)) ? fallback : Number(input);

export const AddExpenseForm = () => {
  const [expenseToAdd, setExpense] = useState<ExpenseToAdd>(
    Defaults.AddExpenseForm
  );

  const set = (key: keyof ExpenseToAdd, value: any) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const { title, amount, when: date, category, categoryColor, categoryIcon, type, every, interval } = expenseToAdd;

  const flipType = () => set('type', type === 'onetime' ? 'subscription' : 'onetime');

  const onSuccess = () => {

  }

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
        <TextInput
          style={{ ...styles.input, flex: 1 }}
          value={`${amount}`}
          onChangeText={(value) => set("amount", toNumber(value, amount))}
          placeholder="Amount"
          keyboardType="numeric"
        />
      </View>
      <TextInput
        style={{ ...styles.input, backgroundColor: categoryColor }}
        value={category}
        onChangeText={(category) => set("category", category)}
        placeholder="Which category?"
      />

      <Picker
        selectedValue={categoryIcon}
        onValueChange={(icon => set('categoryIcon', icon))}>
        {
          Defaults.Icons.map((icon) => <Picker.Item key={icon} label={icon} value={icon} />)
        }
      </Picker>
      <MaterialCommunityIcons name={categoryIcon} size={32} />
      <Picker
        selectedValue={categoryColor}
        onValueChange={(color) => set('categoryColor', color)}>
        {
          Colors.map((color) => <Picker.Item key={color} label={color} value={color} />)
        }
      </Picker>

      <Pickers.OneTime when={date} setDate={(when) => set("when", when)} />

      <Switch value={type === 'subscription'} onChange={flipType} />
      {
        type === 'subscription' ?
          <View>
            <Text>Every: </Text>
            <TextInput keyboardType="numeric" value={`${every}`} onChangeText={(every) => set('every', every)} />
            <Pickers.Interval interval={interval} setInterval={(interval) => set('interval', interval)} />
          </View>
          : null
      }

      <Submit expenseToAdd={expenseToAdd} onSuccess={onSuccess} />
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
});
