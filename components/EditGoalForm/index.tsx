import { FC, useMemo } from "react";
import { Text, TextInput, View } from "../Themed";
import { StyleSheet } from "react-native";
import { Goal } from "@/types";
import { Picker } from "@react-native-picker/picker";
import { Formik, FormikHelpers } from "formik";
import { useGoals } from "@/contexts/Goals/Provider";
import { useAnimateToggle } from "@/hooks";
import { Pressables } from "../Pressables";
import { useSpendings } from "@/contexts/Spendings/Provider";
import { goalToEditSchema } from "@/types/Forms/GoalToEdit.type";

const toNumber = (input: string, fallback: number) =>
    Number.isNaN(Number(input)) ? fallback : Number(input);

type Props = {
    goal: Goal
}

export const EditGoalForm: FC<Props> = ({ goal }) => {
    const { updateGoal } = useGoals();
    const { expenses } = useSpendings();

    const [animate, triggerAnimate] = useAnimateToggle();

    const expenseChoices = useMemo(() => {
        const titles: string[] = [];
        const categories: string[] = [];
        expenses.forEach((expense) => {
            titles.push(expense.title);
            categories.push(expense.category);
        });

        return {
            titles: [...new Set(titles)],
            categories: [...new Set(categories)],
        };
    }, [expenses]);

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

                    <Picker
                        selectedValue={values.link}
                        onBlur={handleBlur("link")}
                        onValueChange={(item) => {
                            const isTitleGoal = expenseChoices.titles.includes(item);
                            setFieldValue(
                                "type",
                                isTitleGoal ? "title-goal" : "category-goal"
                            );
                            setFieldValue("link", item);
                        }}
                    >
                        {expenseChoices.titles.map((title) => (
                            <Picker.Item
                                key={`title-${title}`}
                                value={title}
                                label={`${title} - via title`}
                            />
                        ))}
                        {expenseChoices.categories.map((title) => (
                            <Picker.Item
                                key={`category-${title}`}
                                value={title}
                                label={`${title} - via category`}
                            />
                        ))}
                    </Picker>
                    {errors.link ? (
                        <Text style={styles.errorText}>{errors.link}</Text>
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
