import { View, StyleSheet, ViewProps, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";



type CardProps = {
    mode: 'edit' | 'view' | 'disabled',
    onPress?: () => void;
    onEditPress: () => void;
    onEditConfirmPress?: () => void;
    onEditUndoPress?: () => void;
} & ViewProps

export const EditableCard: React.FC<CardProps> = ({
    children,
    mode,
    onPress,
    onEditPress,
    onEditConfirmPress,
    onEditUndoPress,
    style,
    ...props
}) => {

    const actions = () => {
        switch (mode) {
            case 'view':
                return (
                    <Pressable style={styles.editIcon} onPress={onEditPress}>
                        <MaterialIcons name="mode-edit-outline" size={20} color="grey" />
                    </Pressable>
                );
            case 'edit':
                return (
                    <>
                        <Pressable style={styles.confirmIcon} onPress={onEditConfirmPress}>
                            <MaterialIcons name="check" size={20} color="grey" />
                        </Pressable>
                        <Pressable style={styles.undoIcon} onPress={onEditUndoPress}>
                            <MaterialIcons name="undo" size={20} color="grey" />
                        </Pressable>
                    </>
                )
            case 'disabled':
                return null
        }
    }
    return (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Pressable style={[styles.card, style]} {...props} onPress={onPress}>
                {children}
            </Pressable>
            {actions()}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
    },
    editIcon: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 5,
    },
    confirmIcon: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 5,
    },
    undoIcon: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 5,
    },
    deleteIcon: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 5,
    },
});
