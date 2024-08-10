import * as Yup from "yup";

export const expenseToEditSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .typeError("Amount must be a number"),
  when: Yup.date(),
});
