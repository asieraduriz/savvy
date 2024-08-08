import { Text, TextInput, View } from "@/components/Themed";
import { Formik, FormikHelpers } from "formik";
import { StyleSheet } from "react-native";
import { Defaults } from "@/constants";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pickers } from "../Pickers";
import { Pressables } from "../Pressables";
import { useAnimateToggle } from "@/hooks";
import { useSpendings } from "@/contexts/Spendings/Provider";
import { Subscription } from "@/types";
import { subscriptionToEditSchema } from "@/types/Forms/SubscriptionToEdit.type";

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
                <View style={styles.container}>
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

                    <TextInput
                        style={[
                            styles.input,
                            { backgroundColor: values.category },
                            errors.category ? styles.inputError : null,
                        ]}
                        value={values.category}
                        onChangeText={(category) => setFieldValue("category", category)}
                        onBlur={handleBlur("category")}
                        placeholder="Which category?"
                    />
                    {errors.category ? (
                        <Text style={styles.errorText}>{errors.category}</Text>
                    ) : null}

                    <Picker
                        selectedValue={values.categoryIcon}
                        onBlur={handleBlur("categoryIcon")}
                        onValueChange={(icon) => setFieldValue("categoryIcon", icon)}
                    >
                        {Defaults.Icons.map((icon) => (
                            <Picker.Item key={icon} label={icon} value={icon} />
                        ))}
                    </Picker>

                    <MaterialCommunityIcons name={values.categoryIcon} size={32} />
                    <Picker
                        selectedValue={values.categoryColor}
                        onBlur={handleBlur("categoryColor")}
                        onValueChange={(color) => setFieldValue("categoryColor", color)}
                    >
                        {Defaults.Colors.map((color) => (
                            <Picker.Item key={color} label={color} value={color} />
                        ))}
                    </Picker>

                    <Pickers.OneTime
                        when={values.start}
                        setDate={(start) => setFieldValue("start", start)}
                    />

                    <View>
                        <Text>Every: </Text>
                        <TextInput
                            keyboardType="numeric"
                            value={`${values.every}`}
                            onBlur={handleBlur("every")}
                            onChangeText={(every) => setFieldValue("every", every)}
                        />
                        {errors.every ? (
                            <Text style={styles.errorText}>{errors.every}</Text>
                        ) : null}
                        <Pickers.Interval
                            interval={values.interval}
                            setInterval={(interval) => setFieldValue("interval", interval)}
                        />
                    </View>

                    <Pressables.Animated
                        title="Update subscription"
                        animate={animate}
                        disabled={isSubmitting || !isValid}
                        isLoading={isSubmitting}
                        onPress={() => handleSubmit()}
                    />
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
