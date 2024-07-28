import { MaterialCommunityIcons } from "@expo/vector-icons";

export type Category = {
  name: string;
  iconName?: typeof MaterialCommunityIcons.defaultProps;
  color: string;
}

export type ExpenseBase = {
  id: string;
  amount: number;
  category: Category;
  title: string;
  created: Date;
};

export type OneTimeExpenseBase = {
  when: Date;
};

export type Expense = ExpenseBase & OneTimeExpenseBase;
