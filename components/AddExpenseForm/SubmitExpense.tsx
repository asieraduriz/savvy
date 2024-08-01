import { useExpenses } from "@/contexts";
import { Transformers } from "@/transformers";
import { ExpenseToAdd } from "@/types";
import { FC, useState, useRef } from "react";
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  expenseToAdd: ExpenseToAdd;
  onSuccess: () => void;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const SubmitExpense: FC<Props> = ({ expenseToAdd, onSuccess }) => {
  const { createExpense } = useExpenses();

  const [buttonState, setButtonState] = useState<
    "idle" | "loading" | "success"
  >("idle");
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = async () => {
    setButtonState("loading");
    try {
      const newExpense = Transformers.toExpense(expenseToAdd);
      await createExpense(newExpense);
      await delay(2000);
      setButtonState("success");
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      setTimeout(() => setButtonState("idle"), 2000);
    } catch (error) {
      setButtonState("idle"); // Handle error accordingly
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.button}>
      {buttonState === "idle" && <Text style={styles.text}>Submit</Text>}
      {buttonState === "loading" && (
        <ActivityIndicator size="small" color="#ffffff" />
      )}
      {buttonState === "success" && (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <FontAwesome name="thumbs-up" size={24} color="black" />
        </Animated.View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
});
