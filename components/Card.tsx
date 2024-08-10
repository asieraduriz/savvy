import { View, StyleSheet, ViewProps, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CardProps extends ViewProps {
    backgroundColor?: string;
    onEditPress?: () => void;
    onDeletePress?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, backgroundColor = '#fff', onEditPress, onDeletePress, style, ...props }) => {
    return (
        <View style={[styles.card, { backgroundColor }, style]} {...props}>
            {onEditPress ? <Pressable style={styles.editIcon} onPress={onEditPress}>
                <MaterialIcons name="mode-edit-outline" size={20} color="grey" />
            </Pressable> : null
            }
            {
                onDeletePress ?
                    <Pressable style={styles.deleteIcon} onPress={onDeletePress}>
                        <MaterialCommunityIcons name="delete-empty" size={20} color="grey" />
                    </Pressable>
                    : null
            }
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: 10,
        position: 'relative',
    },
    editIcon: {
        position: 'absolute',
        top: -10,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5,
    },
    deleteIcon: {
        position: 'absolute',
        top: -10,
        right: 50,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 5,
    },
});
