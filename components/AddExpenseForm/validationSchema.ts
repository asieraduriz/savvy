import { ExpenseToAdd, Interval } from "@/types";
import * as Yup from "yup";

const schemaBase = {
    title: Yup.string().required("Title is required"),
    amount: Yup.number().required("Amount is required").positive("Amount must be a positive number").typeError("Amount must be a number"),
    category: Yup.string().required("Category is required"),
    categoryIcon: Yup.string(),
    categoryColor: Yup.string(),
    when: Yup.date()
}

const oneTimeExpenseSchema = Yup.object().shape({ ...schemaBase });

const subscriptionSchema = Yup.object().shape({
    ...schemaBase,
    every: Yup.number().required("Every is required for subscriptions").positive("Every must be a positive number"),
    interval: Yup.string().oneOf(Object.values(Interval)),
});

export const validationSchema = Yup.lazy((values: ExpenseToAdd) => (values.type === "onetime" ? oneTimeExpenseSchema : subscriptionSchema));
