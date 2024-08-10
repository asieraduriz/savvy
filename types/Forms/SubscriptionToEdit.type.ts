import * as Yup from "yup";
import { Interval } from "../Interval.type";

export const subscriptionToEditSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    amount: Yup.number()
        .required("Amount is required")
        .positive("Amount must be a positive number"),
    category: Yup.string().required("Category is required"),
    categoryIcon: Yup.string(),
    categoryColor: Yup.string(),
    start: Yup.date().required("Date is required"),
    every: Yup.number().required("Every is required")
        .positive("Every must be a positive number"),
    Interval: Yup.string().oneOf(Object.values(Interval))
});
