import { useExpenses } from "@/contexts";
import { Transformers } from "@/transformers";
import { ExpenseToAdd } from "@/types";
import { FC } from "react";
import { Button } from "react-native";

type Props = {
  expenseToAdd: ExpenseToAdd;
  onSuccess: () => void;
};

export const Submit: FC<Props> = ({ expenseToAdd, onSuccess }) => {
  const { createExpense } = useExpenses();

  const onPressHandle = () => {
    const newExpense = Transformers.toExpense(expenseToAdd);
    createExpense(newExpense);


    onSuccess();
  };

  return <Button title="Add expense" onPress={onPressHandle} />;
};
