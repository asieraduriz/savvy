import { FC, useState } from "react";
import { Category } from "@/types";
import { StyleSheet } from "react-native";
import { Text, TextInput, View } from "../Themed";
import { EditableCard } from "../EditableCard";
import { Formik, FormikHelpers } from "formik";
import { Picker } from "@react-native-picker/picker";
import { Defaults } from "@/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
    categories: Category[];
    selectedCategory?: Category["id"];
    onCategoryChange: (categoryId: Category["id"]) => void;
    addCategory: (category: Omit<Category, "id">) => Promise<Category | undefined>;
    updateCategory: (category: Category) => Promise<void>;
};

export const CategoryPicker: FC<Props> = ({ categories, selectedCategory, onCategoryChange, addCategory, updateCategory }) => {
    const [editingCategoryId, setEditingCategoryId] = useState<string | undefined>();

    const onEditSubmit = async (values: Category, { setSubmitting }: FormikHelpers<Category>) => {
        await updateCategory(values);
        setEditingCategoryId(undefined);
        setSubmitting(false);
    };

    const onCreateSubmit = async (values: Omit<Category, 'id'>, { setSubmitting }: FormikHelpers<Omit<Category, 'id'>>) => {
        await addCategory(values);
        setEditingCategoryId(undefined);
        setSubmitting(false);
    };

    return (
        <View>
            {categories.map((category) => {
                const mode = editingCategoryId ? (category.id === editingCategoryId ? "edit" : "disabled") : "view";

                return (
                    <View key={category.id}>
                        {mode === "edit" ? (
                            <Formik initialValues={category} onSubmit={onEditSubmit}>
                                {({ handleBlur, values, errors, setFieldValue, handleSubmit, resetForm }) => (
                                    <EditableCard
                                        mode={mode}
                                        onEditPress={() => {
                                            setEditingCategoryId(category.id);
                                        }}
                                        onEditConfirmPress={async () => {
                                            handleSubmit();
                                        }}
                                        onEditUndoPress={async () => {
                                            resetForm();
                                            setEditingCategoryId(undefined);
                                        }}
                                    >
                                        <View>
                                            <TextInput
                                                style={[styles.input, errors.name ? styles.inputError : null]}
                                                value={values.name}
                                                onChangeText={(value) => setFieldValue("name", value)}
                                                onBlur={handleBlur("name")}
                                                placeholder="Category name"
                                            />
                                            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

                                            <Picker
                                                selectedValue={values.iconName}
                                                onBlur={handleBlur("iconName")}
                                                onValueChange={(icon) => setFieldValue("iconName", icon)}
                                            >
                                                {Defaults.Icons.map((icon) => (
                                                    <Picker.Item key={icon} label={icon} value={icon} />
                                                ))}
                                            </Picker>

                                            <MaterialCommunityIcons name={values.iconName} size={32} />
                                            <Picker
                                                selectedValue={values.color}
                                                onBlur={handleBlur("color")}
                                                onValueChange={(color) => setFieldValue("color", color)}
                                            >
                                                {Defaults.Colors.map((color) => (
                                                    <Picker.Item key={color} label={color} value={color} />
                                                ))}
                                            </Picker>
                                        </View>
                                    </EditableCard>
                                )}
                            </Formik>
                        ) : (
                            <EditableCard
                                style={category.id === selectedCategory ? styles.selected : []}
                                key={category.id}
                                mode={mode}
                                onPress={() => onCategoryChange(category.id)}
                                onEditPress={() => {
                                    setEditingCategoryId(category.id);
                                }}
                            >
                                <View>
                                    <Text>{category.name}</Text>
                                    <MaterialCommunityIcons name={category.iconName} size={32} />
                                    <Text>{category.color}</Text>
                                </View>
                            </EditableCard>
                        )}
                    </View>
                );
            })}

            <Formik initialValues={Defaults.Add.Category} onSubmit={onCreateSubmit}>
                {({ handleBlur, values, errors, setFieldValue, handleSubmit, resetForm }) =>
                    <EditableCard
                        mode='edit'
                        onEditPress={() => { }}
                        onEditConfirmPress={async () => {
                            handleSubmit();
                        }}
                        onEditUndoPress={async () => {
                            resetForm();
                        }}
                    >
                        <View>
                            <TextInput
                                style={[styles.input, errors.name ? styles.inputError : null]}
                                value={values.name}
                                onChangeText={(value) => setFieldValue("name", value)}
                                onBlur={handleBlur("name")}
                                placeholder="Category name"
                            />
                            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

                            <Picker
                                selectedValue={values.iconName}
                                onBlur={handleBlur("iconName")}
                                onValueChange={(icon) => setFieldValue("iconName", icon)}
                            >
                                {Defaults.Icons.map((icon) => (
                                    <Picker.Item key={icon} label={icon} value={icon} />
                                ))}
                            </Picker>

                            <MaterialCommunityIcons name={values.iconName} size={32} />
                            <Picker
                                selectedValue={values.color}
                                onBlur={handleBlur("color")}
                                onValueChange={(color) => setFieldValue("color", color)}
                            >
                                {Defaults.Colors.map((color) => (
                                    <Picker.Item key={color} label={color} value={color} />
                                ))}
                            </Picker>
                        </View>
                    </EditableCard>
                }
            </Formik>
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
    errorText: {
        color: "red",
        fontSize: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
    },
    inputError: {
        borderColor: "red",
    },
    selected: {
        borderWidth: 1,
        borderColor: '#181B1C'
    }
});
