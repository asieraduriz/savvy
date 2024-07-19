import { useAddExpense } from "@/contexts";
import { Transformers } from "@/transformers";
import { ExpenseToAdd } from "@/types";
import { FC } from "react";
import { Button } from "react-native";

type Props = {
  expenseToAdd: ExpenseToAdd;
  onPress: () => void;
};

export const Submit: FC<Props> = ({ expenseToAdd, onPress }) => {
  const addExpense = useAddExpense();

  const onPressHandle = () => {
    const newExpense = Transformers.toExpense(expenseToAdd);
    addExpense(newExpense);
  };

  return <Button title="Add expense" onPress={onPressHandle} />;
};
