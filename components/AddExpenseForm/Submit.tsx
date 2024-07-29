import { useExpenses } from "@/contexts";
import { useSubscriptions } from "@/contexts/Subscriptions/Provider";
import { Dates } from "@/datastructures";
import { useToggle } from "@/hooks";
import { Transformers } from "@/transformers";
import { ExpenseToAdd } from "@/types";
import { FC, Fragment, useEffect, useState } from "react";
import { Button } from "react-native";
import { Text, View } from "../Themed";

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
    createExpense(newExpense).then(onSuccess);
  };

  useEffect(() => {
    toggle.off()
  }, [expenseToAdd.every, expenseToAdd.interval, expenseToAdd.when])

  const [datesBetween, setDatesBetween] = useState<Date[]>([]);
  const onSubmitSubscriptionHandle = () => {
    const now = Dates.Now();
    const then = expenseToAdd.when;

    const isSubscriptionEarlier = then.getTime() < now.getTime();
    if (isSubscriptionEarlier) {
      const datesBetween = Dates.occurrencesInInterval(expenseToAdd.when, now, { every: expenseToAdd.every, interval: expenseToAdd.interval });
      setDatesBetween(datesBetween);
      toggle.on();
    } else {
      const subscription = Transformers.toSubscription(expenseToAdd);
      createSubscription(subscription).then(onSuccess);
    }
  };

  const onConfirmSubscriptionHandle = () => {

  }

  return (
    <View>
      {expenseToAdd.type === "onetime" ? (
        <Button title="Add expense" onPress={onSubmitExpenseHandle} />
      ) : (
        <Button title="Add subscription" onPress={onSubmitSubscriptionHandle} />
      )}

      {showConfirmSubscription ?
        <Fragment>
          {
            datesBetween.map((date) => <Text key={date.getTime()}>{Dates.toFormat(date)}</Text>)
          }
          <Button title="Include charged expenses" onPress={onConfirmSubscriptionHandle} />
        </Fragment>
        : null
      }
    </View>
  );
};
