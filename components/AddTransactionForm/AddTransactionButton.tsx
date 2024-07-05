import { useAddTransaction } from "@/contexts";
import { Transaction, UnifiedAddTransaction } from "@/types";
import { randomUUID } from "expo-crypto";
import { FC } from "react";
import { Button } from "react-native";

type Props = {
  transaction: UnifiedAddTransaction;
};

export const AddTransactionButton: FC<Props> = ({ transaction }) => {
  const addTransaction = useAddTransaction();

  const isRecurrent = transaction.type === "recurrent";

  const onPress = () => {
    const newTransactionFields = {
      created: new Date(),
      id: randomUUID(),
    };

    const { frequency, every, startDate, when, ...sharedTransactionFields } =
      transaction;
    const recurrentTransaction: Transaction = {
      frequency,
      every,
      startDate,
      ...sharedTransactionFields,
      ...newTransactionFields,
      type: "recurrent",
    };

    const singleTransaction: Transaction = {
      when,
      ...sharedTransactionFields,
      ...newTransactionFields,
      type: "single",
    };

    const newTransaction: Transaction = isRecurrent
      ? recurrentTransaction
      : singleTransaction;

    addTransaction(newTransaction);
    alert(
      `${newTransaction.type} transaction id: ${
        newTransaction.id
      } - ${JSON.stringify(singleTransaction)}`
    );
  };

  return <Button title="Add Transaction" onPress={onPress} />;
};
