import { Text, TextInput, View } from "../Themed";
import { Button, StyleSheet, Switch } from "react-native";
import { Pickers } from "../Pickers";
import { Defaults } from "@/constants";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { SubmitExpense } from "./SubmitExpense";
import { SubmitSubscription } from "./SubmitSubscription";
import { useState } from "react";
import { ExpenseToAdd } from "@/types";
import { useExpenses } from "@/contexts";
import { Transformers } from "@/transformers";
import { useAnimateToggle } from "@/hooks";

const Colors = ["white", "orange", "red", "blue", "yellow", "pink"];

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  amount: Yup.number().required("Amount is required").min(0, "Amount must be a positive number").typeError("Amount must be a number"),
  category: Yup.string().required("Category is required"),
  every: Yup.number().required("Every is required").min(0, "Every must be a positive number").typeError("Every must be a number"),
});

export const AddExpenseForm = () => {
  const [animate, triggerAnimate] = useAnimateToggle();
  const { createExpense } = useExpenses();
  const [showPastExpenseCharges, setShowPastExpenseCharges] = useState(false);

  const onSubmit = async (values: ExpenseToAdd, { setSubmitting }: FormikHelpers<ExpenseToAdd>) => {
    if (values.type === 'onetime') {
      await createExpense(Transformers.toExpense(values));

      setSubmitting(false);
      triggerAnimate();
    }
  };

  return (
    <Formik initialValues={Defaults.AddExpenseForm} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleBlur, handleSubmit, values, errors, setFieldValue, isSubmitting, status }) => (
        <View style={styles.container}>
          <TextInput
            style={[styles.input, errors.title ? styles.inputError : null]}
            value={values.title}
            onChangeText={(value) => setFieldValue("title", value)}
            onBlur={handleBlur("title")}
            placeholder="Title"
          />
          {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}

          <TextInput
            style={[styles.input, errors.amount ? styles.inputError : null]}
            value={values.amount ? String(values.amount) : undefined}
            onChangeText={(amount) => setFieldValue("amount", Number(amount))}
            placeholder="Amount"
            keyboardType="numeric"
          />
          {errors.amount ? <Text style={styles.errorText}>{errors.amount}</Text> : null}

          <TextInput
            style={[styles.input, { backgroundColor: values.categoryColor }, errors.category ? styles.inputError : null]}
            value={values.category}
            onChangeText={(category) => setFieldValue("category", category)}
            placeholder="Which category?"
          />
          {errors.category ? <Text style={styles.errorText}>{errors.category}</Text> : null}

          <Picker selectedValue={values.categoryIcon} onValueChange={(icon) => setFieldValue("categoryIcon", icon)}>
            {Defaults.Icons.map((icon) => (
              <Picker.Item key={icon} label={icon} value={icon} />
            ))}
          </Picker>
          <MaterialCommunityIcons name={values.categoryIcon} size={32} />
          <Picker selectedValue={values.categoryColor} onValueChange={(color) => setFieldValue("categoryColor", color)}>
            {Colors.map((color) => (
              <Picker.Item key={color} label={color} value={color} />
            ))}
          </Picker>

          <Pickers.OneTime when={values.when} setDate={(when) => setFieldValue("when", when)} />
          <Switch
            value={values.type === "subscription"}
            onChange={() => {
              setFieldValue("type", values.type === "subscription" ? "onetime" : "subscription");
            }}
          />
          {values.type === "subscription" ? (
            <View>
              <Text>Every: </Text>
              <TextInput keyboardType="numeric" value={`${values.every}`} onChangeText={(every) => setFieldValue("every", every)} />
              <Pickers.Interval interval={values.interval} setInterval={(interval) => setFieldValue("interval", interval)} />
            </View>
          ) : null}
          {values.type === "onetime" ? (
            <SubmitExpense onPress={() => handleSubmit()} isSubmitting={isSubmitting} animate={animate} />
          ) : (
            null
          )}
          {showPastExpenseCharges ? (
            <>
              { }
              <Button title="Include charged expenses" />
            </>
          ) : null}
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  inputError: {
    borderColor: "red",
  },
});
