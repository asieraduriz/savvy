import { FC } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Card } from "../Card";
import { Expense } from "@/types/Expense.type";
import { useSpendings } from "@/contexts/Spendings/Provider";
import { useCategories } from "@/contexts/Categories/Provider";
import { Circle } from "../Circle";

type Props = { expense: Expense };

export const OneTimeExpenseItem: FC<Props> = ({ expense }) => {
  const router = useRouter();
  const { findCategory } = useCategories();
  const { deleteExpense } = useSpendings();
  const { id, amount, categoryId, title } = expense;

  const category = findCategory(categoryId);
  if (!category) throw new Error(`OneTimeExpenseItem: Category ${id} was not found`);

  return (
    <Card
      onEditPress={() => router.navigate(`/edit/expense/${id}`)}
      onDeletePress={() => deleteExpense(id)}
    >
      <Circle backgroundColor={category.color}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "space-around",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <Text style={styles.titleText}>
            {title} {amount}
          </Text>
          <MaterialCommunityIcons name={category.iconName} size={32} />
          <Text style={styles.categoryText}>{category.name}</Text>
        </View>
      </Circle>
    </Card>
  );
};

const styles = StyleSheet.create({
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
});
