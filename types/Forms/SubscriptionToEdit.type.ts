import * as Yup from "yup";

export const subscriptionToEditSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    amount: Yup.number()
        .required("Amount is required")
        .positive("Amount must be a positive number"),
    category: Yup.string().required("Category is required"),
    categoryIcon: Yup.string(),
    categoryColor: Yup.string(),
});
