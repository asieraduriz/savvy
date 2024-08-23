import { useAnimateToggle } from "@/hooks";
import { FontAwesome } from "@expo/vector-icons";
import { FC, useState, useEffect, useRef } from "react";
import {
    Text,
    ActivityIndicator,
    StyleSheet,
    Pressable,
    Animated,
} from "react-native";

type Props = {
    onPress: () => void;
    animate: ReturnType<typeof useAnimateToggle>[0];
    title: string;
    disabled?: boolean;
    isLoading?: boolean;
};

export const Animate: FC<Props> = ({ animate, onPress, title, disabled, isLoading }) => {
    const [showSuccess, setShowSuccess] = useState(false);

    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const effect = async () => {
            if (animate) {
                setShowSuccess(true);
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

                timer = setTimeout(() => setShowSuccess(false), 2000);
            }
        }
        effect();

        return () => clearTimeout(timer);
    }, [animate, scaleAnim]);

    return (
        <Pressable
            style={[
                styles.button,
                { backgroundColor: showSuccess ? 'green' : '#007bff' },
                isLoading ? styles.buttonSubmitting : null
            ]}
            onPress={onPress}
            disabled={disabled || showSuccess}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
            ) : showSuccess ? (
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <FontAwesome name="thumbs-up" size={24} color="black" />
                </Animated.View>
            ) : (
                <Text style={styles.text}>{title}</Text>
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
