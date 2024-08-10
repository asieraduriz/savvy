import { Service } from "@/services";
import { Category } from "@/types";
import { randomUUID } from "expo-crypto";
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    PropsWithChildren,
} from "react";

interface CategoryContextType {
    categories: Category[];
    isLoading: boolean;
    error: Error | null;
    refreshCategories: () => Promise<void>;
    createCategory: (category: Omit<Category, 'id'>) => Promise<void>;
    updateCategory: (category: Category) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
}

const Context = createContext<CategoryContextType | null>(null);

type CategoriesProviderProps = PropsWithChildren<{
    categoryService: Service<Category>;
}>;

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({
    children,
    categoryService,
}) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const refreshCategories = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const fetchedCategories = await categoryService.readAll();
            setCategories(fetchedCategories);
        } catch (err) {
            setError(
                err instanceof Error ? err : new Error("An unknown error occurred")
            );
        } finally {
            setIsLoading(false);
        }
    }, [categoryService]);

    useEffect(() => {
        refreshCategories();
    }, [refreshCategories]);

    const createCategory = useCallback(
        async (categoryToAdd: Omit<Category, 'id'>) => {

            const category: Category = {
                id: randomUUID(),
                ...categoryToAdd,
            }
            try {
                const newCategory = await categoryService.create(category);
                setCategories((prevCategories) => [...prevCategories, newCategory]);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err
                        : new Error(
                            `Failed to add category ${category.id} ${JSON.stringify(category, null, 4)}`
                        )
                );
            }
        },
        [categoryService]
    );

    const updateCategory = useCallback(
        async (updatedCategory: Category) => {
            try {
                await categoryService.update(updatedCategory);
                setCategories((prevCategories) =>
                    prevCategories.map((category) =>
                        category.id === updatedCategory.id ? updatedCategory : category
                    )
                );
            } catch (err) {
                setError(
                    err instanceof Error ? err : new Error("Failed to update category")
                );
            }
        },
        [categoryService]
    );

    const deleteCategory = useCallback(
        async (id: string) => {
            try {
                await categoryService.delete(id);
                setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
            } catch (err) {
                setError(
                    err instanceof Error ? err : new Error("Failed to delete category")
                );
            }
        },
        [categoryService]
    );

    const value = {
        categories,
        isLoading,
        error,
        refreshCategories,
        createCategory,
        updateCategory,
        deleteCategory,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useCategories = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useCategories must be used within an CategoriesProvider");
    }
    return context;
};
