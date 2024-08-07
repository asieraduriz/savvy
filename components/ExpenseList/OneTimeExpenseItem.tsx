import { FC, PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../Themed";
import { Expense } from "@/types";
import { useExpenses } from "@/contexts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Card } from "../Card";

type Props = { expense: Expense };

const Circle: React.FC<PropsWithChildren<{ backgroundColor: Expense["categoryColor"] }>> = ({ backgroundColor, children }) => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      <View style={[styles.circle, { backgroundColor }]} />
      <View >
        {children}
      </View>
    </View>
  );
};

export const OneTimeExpenseItem: FC<Props> = ({ expense }) => {
  const { deleteExpense } = useExpenses();
  const { id, amount, category, categoryIcon, categoryColor, title } = expense;

  const router = useRouter();
  return (
    <Card onEditPress={() => router.navigate(`/edit/expense/${id}`)} onDeletePress={() => deleteExpense(id)}>
      <Circle backgroundColor={categoryColor}>
        <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'space-around', gap: 10, justifyContent: 'center' }}>

          <Text style={styles.titleText}>{title} {amount}</Text>
          <MaterialCommunityIcons name={categoryIcon} size={32} />
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      </Circle>
    </Card>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10, // Half of the width/height to make it a circle
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 20
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
});
