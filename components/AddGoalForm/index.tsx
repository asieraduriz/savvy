import { useMemo, useState } from "react";
import { TextInput, View } from "../Themed";
import { StyleSheet } from "react-native";
import { GoalToAdd } from "@/types";
import { Defaults } from "@/constants";
import { Submit } from "./Submit";
import { useExpenses } from "@/contexts";
import { Picker } from "@react-native-picker/picker";

const toNumber = (input: string, fallback: number) =>
    Number.isNaN(Number(input)) ? fallback : Number(input);

export const AddGoalForm = () => {
    const { expenses } = useExpenses();
    const [goalToAdd, setGoal] = useState<GoalToAdd>(Defaults.AddGoalForm);

    const set = (key: keyof GoalToAdd, value: any) => {
        setGoal((prev) => ({ ...prev, [key]: value }));
    };

    const { title, type, target, link } = goalToAdd;

    const onSuccess = () => {

    }

    const expenseChoices = useMemo(() => {
        const titles: string[] = [];
        const categories: string[] = [];
        expenses.forEach((expense) => {
            titles.push(expense.title);
            categories.push(expense.category.name)
        });

        return { titles: [... new Set(titles)], categories: [...new Set(categories)] }
    }, [expenses]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={(title) => set("title", title)}
                placeholder="Title"
            />
            <Picker selectedValue={link} onValueChange={(item) => {
                const isTitleGoal = expenseChoices.titles.includes(item);
                set('type', isTitleGoal ? 'title-goal' : 'category-goal');
                set('link', item)
            }}>
                {
                    expenseChoices.titles.map((title) => <Picker.Item key={`title-${title}`} value={title} label={`${title} - via title`} />)
                }
                {
                    expenseChoices.categories.map((title) => <Picker.Item key={`category-${title}`} value={title} label={`${title} - via category`} />)

                }
            </Picker>
            <TextInput
                style={{ ...styles.input, flex: 1 }}
                value={`${target}`}
                onChangeText={(value) => set("target", toNumber(value, target))}
                placeholder="Limit"
                keyboardType="numeric"
            />
            <Submit goalToAdd={goalToAdd} onSuccess={onSuccess} />
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
