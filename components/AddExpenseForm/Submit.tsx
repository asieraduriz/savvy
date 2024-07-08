import { useAddExpense } from "@/contexts";
import { Transformers } from "@/transformers";
import { ExpenseToAdd } from "@/types";
import { FC } from "react";
import { Button } from "react-native";

type Props = {
  expenseToAdd: ExpenseToAdd;
};

export const Submit: FC<Props> = ({ expenseToAdd }) => {
  const addExpense = useAddExpense();


  const onPress = () => {
    const newExpense = Transformers.toExpense(expenseToAdd)
    addExpense(newExpense);
  };

  return <Button title="Add expense" onPress={onPress} />;
};
