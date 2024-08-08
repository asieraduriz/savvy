import * as Yup from "yup";
import { Subscription } from "../Subscription.type";

export type SubscriptionToEdit = {
    title?: Subscription["title"];
    amount?: Subscription["amount"];
    category?: Subscription["category"];
    categoryIcon?: Subscription["categoryIcon"];
    categoryColor?: Subscription["categoryColor"];
};

export const expenseToEditSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    amount: Yup.number()
        .required("Amount is required")
        .positive("Amount must be a positive number")
        .typeError("Amount must be a number"),
    category: Yup.string().required("Category is required"),
    categoryIcon: Yup.string(),
    categoryColor: Yup.string(),
    when: Yup.date(),
});
