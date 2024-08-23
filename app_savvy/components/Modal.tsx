import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC, PropsWithChildren } from "react";
import { Modal, View, Pressable } from "react-native";

type FullScreenModalProps = PropsWithChildren<{
    visible: boolean;
    onClose: () => void;
    showCloseButton?: boolean;
}>

export const FullScreenModal: FC<FullScreenModalProps> = ({
    visible,
    onClose,
    children,
    showCloseButton = true,
}) => {
    return (
        <Modal
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View >
                {children}
                {showCloseButton && (
                    <Pressable onPress={onClose}>
                        <MaterialCommunityIcons name="window-close" size={24} color="black" />
                    </Pressable>
                )}
            </View>
        </Modal>
    );
};
