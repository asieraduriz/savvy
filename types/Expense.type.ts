import { toFormat } from "@/datastructures/Date";

export type ExpenseBase = {
  id: string;
  amount: number;
  category: string;
  title: string;
  created: Date;
};

export type OneTimeExpenseBase = {
  when: Date;
  day: ReturnType<typeof toFormat>;
};

export type Expense = ExpenseBase & OneTimeExpenseBase;
