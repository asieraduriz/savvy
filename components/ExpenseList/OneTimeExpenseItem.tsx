import { FC } from "react";
import { Button, StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { Expense } from "@/types";
import { useExpenses } from "@/contexts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

type Props = { expense: Expense };

export const OneTimeExpenseItem: FC<Props> = ({ expense }) => {
  const { deleteExpense } = useExpenses();
  const { id, amount, category, title, type } = expense;

  return (
    <View style={styles.expenseCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.amountText}>{type}</Text>
        <Text style={styles.amountText}>{amount}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={{ ...styles.categoryRow, backgroundColor: category.color }}>
          <View style={[styles.categoryIcon, styles.categoryRow]} />
          <MaterialCommunityIcons name={category.iconName} size={32} />
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
        {title && <Text style={styles.titleText}>{title}</Text>}
      </View>
      <Link href={`/edit/expense/${id}`}>
        <Text>Edit</Text></Link>
      <Button title="Delete" onPress={() => deleteExpense(id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  expenseCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.6,
    elevation: 3, // For Android
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#888",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardBody: {
    marginTop: 8,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  categoryIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: "#ccc",
  },
  categoryText: {
    fontSize: 14,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  detailsText: {
    fontSize: 14,
    color: "#000",
  },
});
