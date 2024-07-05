import { FC } from "react";
import { StyleSheet } from "react-native";
import { RecurrentTransaction } from "@/types";
import { Text, View } from "../Themed";
import { formatDate } from "date-fns";

type Props = { transaction: RecurrentTransaction };

export const RecurrentTransactionItem: FC<Props> = ({ transaction }) => {
  const {
    frequency,
    every,
    startDate,
    amount,
    currency,
    category,
    title,
    description,
  } = transaction;

  const formattedAmount = `${amount} ${currency}`;

  return (
    <View style={styles.transactionCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.amountText}>{formattedAmount}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.categoryRow}>
          <View style={[styles.categoryIcon, styles.categoryRow]} />
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        {title && <Text style={styles.titleText}>{title}</Text>}
        {description && (
          <Text style={styles.descriptionText}>{description}</Text>
        )}
        <View style={styles.recurringDetails}>
          <Text style={styles.recurringText}>
            Recurring: every {every} {frequency}
          </Text>
          <Text style={styles.recurringText}>
            Starts: {formatDate(startDate, "do MMM yyyy")}
          </Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Text style={styles.detailsText}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.6,
    elevation: 3,
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
  recurringText: {
    fontSize: 12,
    color: "#ccc",
  },
  cardFooter: {
    marginTop: 8,
    alignItems: "flex-end",
  },
  detailsText: {
    fontSize: 14,
    color: "#000",
  },
  recurringDetails: {
    marginTop: 8,
  },
});
