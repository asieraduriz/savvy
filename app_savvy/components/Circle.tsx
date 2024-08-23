import { Category } from "@/types";
import { FC, PropsWithChildren } from "react";
import { View } from "./Themed";
import { StyleSheet } from "react-native";

export const Circle: FC<PropsWithChildren<{ backgroundColor: Category["color"] }>
> = ({ backgroundColor, children }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <View style={[styles.circle, { backgroundColor }]} />
            <View>{children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10, // Half of the width/height to make it a circle
        borderColor: "#ccc",
        borderWidth: 1,
        marginRight: 20,
    },
});
