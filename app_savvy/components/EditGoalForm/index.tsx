import { FC } from "react";
import { Text, TextInput, View } from "../Themed";
import { StyleSheet } from "react-native";
import { Goal } from "@/types";
import { Formik, FormikHelpers } from "formik";
import { useGoals } from "@/contexts/Goals/Provider";
import { useAnimateToggle } from "@/hooks";
import { Pressables } from "../Pressables";
import { goalToEditSchema } from "@/types/Forms/GoalToEdit.type";

const toNumber = (input: string, fallback: number) =>
    Number.isNaN(Number(input)) ? fallback : Number(input);

type Props = {
    goal: Goal
}

export const EditGoalForm: FC<Props> = ({ goal }) => {
    const { updateGoal } = useGoals();

    const [animate, triggerAnimate] = useAnimateToggle();

    const onSubmit = async (
        values: Goal,
        { setSubmitting }: FormikHelpers<Goal>
    ) => {
        await updateGoal(values);
        setSubmitting(false);
        triggerAnimate();
    };

    return (
        <Formik
            initialValues={goal}
            validationSchema={goalToEditSchema}
            onSubmit={onSubmit}
        >
            {({
                handleBlur,
                handleSubmit,
                values,
                errors,
                setFieldValue,
                isSubmitting,
                isValid,
            }) => (
                <View style={styles.container}>
                    <TextInput
                        style={[styles.input, errors.title ? styles.inputError : null]}
                        value={values.title}
                        onChangeText={(title) => setFieldValue("title", title)}
                        placeholder="Title"
                        onBlur={handleBlur("title")}
                    />
                    {errors.title ? (
                        <Text style={styles.errorText}>{errors.title}</Text>
                    ) : null}

                    <TextInput
                        style={[styles.input, errors.limit ? styles.inputError : null]}
                        value={`${values.limit}`}
                        onBlur={handleBlur("limit")}
                        onChangeText={(value) =>
                            setFieldValue("limit", toNumber(value, values.limit))
                        }
                        placeholder="Limit"
                        keyboardType="numeric"
                    />
                    {errors.limit ? (
                        <Text style={styles.errorText}>{errors.limit}</Text>
                    ) : null}

                    <Pressables.Animated
                        title="Update goal"
                        animate={animate}
                        onPress={() => handleSubmit()}
                        disabled={isSubmitting || !isValid}
                        isLoading={isSubmitting}
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
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
    },
    inputError: {
        borderColor: "red",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    errorText: {
        color: "red",
        fontSize: 12,
    },
    button: {
        backgroundColor: "#007BFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
    },
    buttonSubmitting: {
        opacity: 0.7,
    },
    text: {
        color: "#ffffff",
        fontSize: 16,
    },
});
