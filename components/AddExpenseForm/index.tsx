import { useState } from "react";
import { TextInput, View } from "../Themed";
import { StyleSheet } from "react-native";
import { ExpenseToAdd } from "@/types";
import { Pickers } from "../Pickers";
import { Defaults } from "@/constants";
import { Submit } from "./Submit";
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const IconFamilies = {
  MaterialCommunityIcons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/glyphmaps/MaterialCommunityIcons.json"),
};

const IconsArray = [...Object.entries(IconFamilies.MaterialCommunityIcons).map(([iconName, glyphValue]) => {
  return {
    name: iconName,
    // value: glyphValue,
    // family: "MaterialCommunityIcons",
  };
})
];


const Colors = ["white", "orange", "red", "blue", "yellow"];

const toNumber = (input: string, fallback: number) =>
  Number.isNaN(Number(input)) ? fallback : Number(input);

export const AddExpenseForm = () => {
  const [expenseToAdd, setExpense] = useState<ExpenseToAdd>(
    Defaults.AddExpenseForm
  );

  const set = (key: keyof ExpenseToAdd, value: any) => {
    setExpense((prev) => ({ ...prev, [key]: value }));
  };

  const { title, amount, when: date, category, categoryColor, categoryIcon } = expenseToAdd;

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
          IconsArray.map(({ name }) =>
            <Picker.Item key={name} label={name} value={name} />
          )
        }
      </Picker>
      <MaterialCommunityIcons name={categoryIcon} size={32} />
      <Picker
        selectedValue={categoryColor}
        onValueChange={(color) => set('categoryColor', color)}>
        {
          Colors.map((color) =>
            <Picker.Item key={color} label={color} value={color} />
          )
        }
      </Picker>

      <Pickers.OneTime when={date} setDate={(when) => set("when", when)} />
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
});
