import { Transaction } from "@/types";
import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from "react";

const TransactionContext = createContext<
  | {
      transactions: Transaction[];
      addTransaction: (transaction: Transaction) => void;
    }
  | undefined
>(undefined);

type Props = PropsWithChildren;

export const TransactionsProvider = ({ children }: Props) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined)
    throw new Error("useTransactions must be used within TransactionsProvider");

  return context.transactions;
};

export const useAddTransaction = () => {
  const context = useContext(TransactionContext);
  if (context === undefined)
    throw new Error(
      "useAddTransaction must be used within TransactionsProvider"
    );

  return context.addTransaction;
};
