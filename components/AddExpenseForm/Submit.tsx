import { useExpenses } from "@/contexts";
import { useSubscriptions } from "@/contexts/Subscriptions/Provider";
import { Dates } from "@/datastructures";
import { useToggle } from "@/hooks";
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
  const { createSubscription } = useSubscriptions();

  const [showConfirmSubscription, toggle] = useToggle(false);

  const onSubmitExpenseHandle = () => {
    const newExpense = Transformers.toExpense(expenseToAdd);
    createExpense(newExpense);
    onSuccess();
  };

  const onSubmitSubscriptionHandle = () => {
    const tomorrow = Dates.Tomorrow();
    const then = expenseToAdd.when;

    const isSubscriptionEarlier = then.getTime() < tomorrow.getTime();

    if (isSubscriptionEarlier) {
      toggle.on();
    } else {

    }
  }

  return expenseToAdd.type === 'onetime' ?
    <Button title="Add expense" onPress={onSubmitExpenseHandle} /> :
    <Button title="Add subscription" onPress={onSubmitSubscriptionHandle} />
};
