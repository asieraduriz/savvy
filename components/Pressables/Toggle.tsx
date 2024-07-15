import { useToggle } from "@/hooks";
import { FC, PropsWithChildren } from "react";
import { StyleSheet, Pressable } from "react-native";

type Props = PropsWithChildren<{
  onPress: (isActive: boolean) => void;
  toggled?: boolean;
}>;

export const Toggle: FC<Props> = ({ children, onPress, toggled = false }) => {
  const [isToggled, toggle] = useToggle(toggled);

  const handlePress = () => {
    onPress(!isToggled);
    toggle.flip();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.toggle, isToggled && styles.toggleOn]}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  toggle: {
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 5,
    margin: 5,
  },
  toggleOn: {
    backgroundColor: "#aaa",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
