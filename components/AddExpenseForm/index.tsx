import { Text, TextInput, View } from "../Themed";
import { StyleSheet, Switch } from "react-native";
import { Pickers } from "../Pickers";
import { Defaults } from "@/constants";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Formik, FormikHelpers } from "formik";
import { SubmitExpenseButton } from "./SubmitExpenseButton";
import { ExpenseToAdd } from "@/types";
import { useExpenses } from "@/contexts";
import { Transformers } from "@/transformers";
import { useAnimateToggle } from "@/hooks";
import { useSubscriptions } from "@/contexts/Subscriptions/Provider";
import { SubmitSubscriptionButton } from "./SubmitSubscriptionButton";
import { validationSchema } from "./validationSchema";

const Colors = ["white", "orange", "red", "blue", "yellow", "pink"];

export const AddExpenseForm = () => {
  const [animate, triggerAnimate] = useAnimateToggle();
  const { createExpense } = useExpenses();
  const { createSubscription } = useSubscriptions();

  const onSubmit = async (values: ExpenseToAdd, { setSubmitting }: FormikHelpers<ExpenseToAdd>) => {
    if (values.type === "onetime") {
      await createExpense(Transformers.toExpense(values));

      setSubmitting(false);
      triggerAnimate();
    } else {
      if (values.pastSubscriptionChargeDates?.length) {
        const subscription = Transformers.toSubscription(values);
        createSubscription(subscription);
        const subscriptionExpenses = values.pastSubscriptionChargeDates.map((date) =>
          Transformers.toSubscriptionExpense(values, date, subscription.id)
        );

        for (const expense of subscriptionExpenses) {
          await createExpense(expense);
        }
      }

      const subscription = Transformers.toSubscription(values);
      await createSubscription(subscription);

      setSubmitting(false);
      triggerAnimate();
    }
  };

  return (
    <Formik initialValues={Defaults.AddExpenseForm} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleBlur, values, errors, setFieldValue }) => (
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
            onBlur={handleBlur("amount")}
            placeholder="Amount"
            keyboardType="numeric"
          />
          {errors.amount ? <Text style={styles.errorText}>{errors.amount}</Text> : null}

          <TextInput
            style={[styles.input, { backgroundColor: values.categoryColor }, errors.category ? styles.inputError : null]}
            value={values.category}
            onChangeText={(category) => setFieldValue("category", category)}
            onBlur={handleBlur("category")}
            placeholder="Which category?"
          />
          {errors.category ? <Text style={styles.errorText}>{errors.category}</Text> : null}

          <Picker selectedValue={values.categoryIcon}
            onBlur={handleBlur("categoryIcon")}
            onValueChange={(icon) => setFieldValue("categoryIcon", icon)}>
            {Defaults.Icons.map((icon) => (
              <Picker.Item key={icon} label={icon} value={icon} />
            ))}
          </Picker>

          <MaterialCommunityIcons name={values.categoryIcon} size={32} />
          <Picker selectedValue={values.categoryColor}
            onBlur={handleBlur("categoryColor")}
            onValueChange={(color) => setFieldValue("categoryColor", color)}>
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
              <TextInput keyboardType="numeric" value={`${values.every}`}
                onBlur={handleBlur("every")}
                onChangeText={(every) => setFieldValue("every", every)} />
              {errors.every ? <Text style={styles.errorText}>{errors.every}</Text> : null}
              <Pickers.Interval interval={values.interval} setInterval={(interval) => setFieldValue("interval", interval)} />
            </View>
          ) : null}

          {values.type === "onetime" ? (
            <SubmitExpenseButton animate={animate} />
          ) : (
            <SubmitSubscriptionButton />
          )}
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
