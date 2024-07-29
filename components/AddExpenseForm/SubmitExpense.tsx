import { useExpenses } from "@/contexts";
import { Transformers } from "@/transformers";
import { ExpenseToAdd } from "@/types";
import { FC } from "react";
import { Button } from "react-native";
import { View } from "../Themed";

type Props = {
    expenseToAdd: ExpenseToAdd;
    onSuccess: () => void;
};

export const SubmitExpense: FC<Props> = ({ expenseToAdd, onSuccess }) => {
    const { createExpense } = useExpenses();

    const onSubmitExpenseHandle = async () => {
        const newExpense = Transformers.toExpense(expenseToAdd);
        await createExpense(newExpense);
        onSuccess();
    };

    return (
        <View>
            <Button title="Add expense" onPress={onSubmitExpenseHandle} />
        </View>
    );
};
