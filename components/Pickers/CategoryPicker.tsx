import { FC, useState } from "react";
import { Category } from "@/types";
import { Pressable, StyleSheet } from "react-native";
import { View } from "../Themed";
import { useToggle } from "@/hooks";
import { EditableCard } from "../EditableCard";

type Props = {
    categories: Category[];
    selectedCategory?: Category["id"];
    onCategoryChange: (category: Category) => void;
    addCategory: (category: Omit<Category, "id">) => void;
    updateCategory: (category: Category) => void;
};

export const CategoryPicker: FC<Props> = ({ categories, selectedCategory, onCategoryChange, addCategory, updateCategory }) => {
    const [isEditing, toggleEditing] = useToggle();
    const [editingCategoryId, setEditingCategoryId] = useState(selectedCategory);

    return (
        <View>
            {categories.map((category) => {
                return (
                    <Pressable
                        key={category.id}
                        onPress={() => onCategoryChange(category)}
                    >
                        <EditableCard
                            isDisabled={isEditing && category.id !== editingCategoryId}
                            isEditing={isEditing}
                            onEditPress={() => setEditingCategoryId(category.id)}
                            onEditConfirmPress={() => {
                                toggleEditing.off();

                            }}
                        ></EditableCard>
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
    },
});
