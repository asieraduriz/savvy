import { Category } from "@/types";
import { FC } from "react";
import { Text, View } from "./Themed";
import { useCategories } from "@/contexts/Categories/Provider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useToggle } from "@/hooks";
import { Pickers } from "./Pickers";

type Props = {
    id?: Category["id"];
    onCategoryChange: (id: Category["id"]) => void;

};

export const CategoryViewer: FC<Props> = ({ id, onCategoryChange }) => {
    const [isChangingCategory, categoryToggle] = useToggle(!id);
    const { findCategory, categories, createCategory, updateCategory } = useCategories();

    const category = id ? findCategory(id) : undefined;
    return (
        <View>
            {
                category ?
                    <View>
                        <Text>{category.name}</Text>
                        <MaterialCommunityIcons name={category.iconName} size={32} />
                        <Text>{category.color}</Text>
                    </View> : null
            }
            {isChangingCategory ? (
                <Pickers.CategoryPicker
                    addCategory={createCategory}
                    updateCategory={updateCategory}
                    categories={categories}
                    onCategoryChange={(categoryId) => {
                        categoryToggle.off();
                        onCategoryChange(categoryId);
                    }}
                />
            ) : (
                <Pressable onPress={categoryToggle.on}>
                    <MaterialCommunityIcons name="redo" size={24} color="black" />
                </Pressable>
            )}
        </View>
    );
};
