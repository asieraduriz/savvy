import { Text, TextInput } from "@/components/Themed";
import { Formik, FormikHelpers } from "formik";
import { ScrollView, StyleSheet } from "react-native";
import { Pickers } from "../Pickers";
import { Pressables } from "../Pressables";
import { useAnimateToggle } from "@/hooks";
import { useSpendings } from "@/contexts/Spendings/Provider";
import { Subscription } from "@/types";
import { subscriptionToEditSchema } from "@/types/Forms/SubscriptionToEdit.type";
import { CategoryViewer } from "../CategoryViewer";

type Props = {
    subscription: Subscription;
};

export const EditSubscriptionForm = ({ subscription }: Props) => {
    const [animate, triggerAnimate] = useAnimateToggle();
    const { updateSubscription } = useSpendings();

    const onSubmit = async (
        values: Subscription,
        { setSubmitting }: FormikHelpers<Subscription>
    ) => {
        updateSubscription(values);
        setSubmitting(false);
        triggerAnimate();
    };
    return (
        <Formik
            initialValues={subscription}
            validationSchema={subscriptionToEditSchema}
            onSubmit={onSubmit}
        >
            {({
                handleBlur,
                values,
                errors,
                setFieldValue,
                isSubmitting,
                isValid,
                handleSubmit,
            }) => (
                <ScrollView style={styles.container}>
                    <TextInput
                        style={[styles.input, errors.title ? styles.inputError : null]}
                        value={values.title}
                        onChangeText={(value) => setFieldValue("title", value)}
                        onBlur={handleBlur("title")}
                        placeholder="Title"
                    />
                    {errors.title ? (
                        <Text style={styles.errorText}>{errors.title}</Text>
                    ) : null}

                    <TextInput
                        style={[styles.input, errors.amount ? styles.inputError : null]}
                        value={values.amount ? String(values.amount) : undefined}
                        onChangeText={(amount) => setFieldValue("amount", Number(amount))}
                        onBlur={handleBlur("amount")}
                        placeholder="Amount"
                        keyboardType="numeric"
                    />
                    {errors.amount ? (
                        <Text style={styles.errorText}>{errors.amount}</Text>
                    ) : null}

                    <CategoryViewer
                        id={values.categoryId}
                        onCategoryChange={(categoryId) => setFieldValue("categoryId", categoryId)}
                    />

                    <Pickers.OneTime
                        when={values.start}
                        setDate={(start) => setFieldValue("start", start)}
                    />

                    <Pressables.Animated
                        title="Update subscription"
                        animate={animate}
                        disabled={isSubmitting || !isValid}
                        isLoading={isSubmitting}
                        onPress={() => handleSubmit()}
                    />
                </ScrollView>
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
