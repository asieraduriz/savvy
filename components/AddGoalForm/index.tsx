import { useState } from "react";
import { TextInput, View } from "../Themed";
import { StyleSheet, Switch } from "react-native";
import { GoalToAdd } from "@/types";
import { Defaults } from "@/constants";
import { Submit } from "./Submit";

const toNumber = (input: string, fallback: number) =>
    Number.isNaN(Number(input)) ? fallback : Number(input);

export const AddGoalForm = () => {
    const [goalToAdd, setGoal] = useState<GoalToAdd>(Defaults.AddGoalForm);

    const set = (key: keyof GoalToAdd, value: any) => {
        setGoal((prev) => ({ ...prev, [key]: value }));
    };

    const { title, type, target } = goalToAdd;

    const flipType = () => set('type', type === 'title-goal' ? 'category-goal' : 'title-goal');

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
                    value={`${target}`}
                    onChangeText={(value) => set("target", toNumber(value, target))}
                    placeholder="Limit"
                    keyboardType="numeric"
                />
            </View>
            <Switch value={type === 'title-goal'} onChange={flipType} />

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
