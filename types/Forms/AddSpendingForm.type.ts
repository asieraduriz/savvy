import { Expense } from "../Expense.type";
import { Interval } from "../Interval.type";
import * as Yup from "yup";
import { Subscription } from "../Subscription.type";

export type AddSpendingFormType = {
  /* Expense properties */
  title?: Expense["title"];
  amount?: Expense["amount"];
  category?: Expense["category"];
  categoryIcon?: Expense["categoryIcon"];
  categoryColor?: Expense["categoryColor"];
  type: Expense["type"];
  when: Expense["when"];
  /* Subscription properties */
  every: Subscription["every"];
  interval: Subscription["interval"];
  pastSubscriptionChargeDates?: Expense["when"][]; // This is used to identify possible past dates the subscription was charged to us
};

const schemaBase = {
  title: Yup.string().required("Title is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .typeError("Amount must be a number"),
  category: Yup.string().required("Category is required"),
  categoryIcon: Yup.string(),
  categoryColor: Yup.string(),
  when: Yup.date(),
};

const oneTimeExpenseSchema = Yup.object().shape({ ...schemaBase });

const subscriptionSchema = Yup.object().shape({
  ...schemaBase,
  every: Yup.number()
    .required("Every is required for subscriptions")
    .positive("Every must be a positive number"),
  interval: Yup.string().oneOf(Object.values(Interval)),
});

export const addSpendingFormSchema = Yup.lazy((values: AddSpendingFormType) =>
  values.type === "onetime" ? oneTimeExpenseSchema : subscriptionSchema
);
