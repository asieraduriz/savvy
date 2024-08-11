import { Text, TextInput, View } from "../Themed";
import { StyleSheet, Switch } from "react-native";
import { Pickers } from "../Pickers";
import { Formik, FormikHelpers } from "formik";
import { useAnimateToggle } from "@/hooks";
import { SubmitSubscriptionButton } from "./SubmitSubscriptionButton";
import { Pressables } from "../Pressables";
import { FC } from "react";
import { AddSpendingFormType, addSpendingFormSchema } from "@/types/Forms/AddSpendingForm.type";
import { useSpendings } from "@/contexts/Spendings/Provider";
import { CategoryViewer } from "../CategoryViewer";

type Props = {
  initialExpense: AddSpendingFormType;
};

export const AddSpendingForm: FC<Props> = ({ initialExpense }) => {
  const [animate, triggerAnimate] = useAnimateToggle();
  const { createSpending } = useSpendings();

  const onSubmit = async (values: AddSpendingFormType, { setSubmitting }: FormikHelpers<AddSpendingFormType>) => {
    await createSpending(values);
    setSubmitting(false);
    triggerAnimate();
  };

  return (
    <Formik initialValues={initialExpense} validationSchema={addSpendingFormSchema} onSubmit={onSubmit}>
      {({ handleBlur, values, errors, setFieldValue, isSubmitting, isValid, handleSubmit }) => (
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
          <CategoryViewer
            id={values.categoryId}
            onCategoryChange={(categoryId) => setFieldValue("categoryId", categoryId)}
          />

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
              <TextInput
                keyboardType="numeric"
                value={`${values.every}`}
                onBlur={handleBlur("every")}
                onChangeText={(every) => setFieldValue("every", every)}
              />
              {errors.every ? <Text style={styles.errorText}>{errors.every}</Text> : null}
              <Pickers.Interval interval={values.interval} setInterval={(interval) => setFieldValue("interval", interval)} />
            </View>
          ) : null}

          {values.type === "onetime" ? (
            <Pressables.Animated
              title="Create expense"
              animate={animate}
              disabled={isSubmitting || !isValid}
              isLoading={isSubmitting}
              onPress={() => handleSubmit()}
            />
          ) : (
            <SubmitSubscriptionButton animate={animate} />
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
