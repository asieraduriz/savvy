import { Defaults } from "@/constants";
import { Expense } from "@/types";
import React, { createContext, useState, useContext, PropsWithChildren } from "react";

const ExpenseContext = createContext<
  | {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
  }
  | undefined
>(undefined);

type Props = PropsWithChildren;

export const ExpensesProvider = ({ children }: Props) => {
  const [expenses, setExpenses] = useState<Expense[]>(Defaults.Starters);

  const addExpense = (expense: Expense) => {
    setExpenses((previous) => [...previous, expense]);
  };

  return <ExpenseContext.Provider value={{ expenses: expenses, addExpense }}>{children}</ExpenseContext.Provider>;
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) throw new Error("useExpenses must be used within ExpensesProvider");

  return context.expenses;
};

export const useAddExpense = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) throw new Error("useAddExpense must be used within ExpensesProvider");

  return context.addExpense;
};
