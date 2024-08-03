import { useAnimateToggle } from "@/hooks";
import { FC, useState, useEffect } from "react";
import {
  Text,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";

type Props = {
  animate: ReturnType<typeof useAnimateToggle>[0];
  onPress: () => void;
  isSubmitting: boolean;
};

export const SubmitExpense: FC<Props> = ({ animate, onPress, isSubmitting }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (animate) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: showSuccess ? 'green' : '#007bff' },
        isSubmitting ? styles.buttonSubmitting : null
      ]}
      onPress={onPress}
      disabled={isSubmitting || showSuccess}
    >
      {isSubmitting ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : showSuccess ? (
        <Text style={styles.text}>Success</Text>
      ) : (
        <Text style={styles.text}>Create expense</Text>
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
  buttonSubmitting: {
    opacity: 0.7,
  },
  text: {
    color: "#ffffff",
    fontSize: 16,
  },
});
