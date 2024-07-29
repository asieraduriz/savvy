import { ExpenseToAdd } from "@/types";
import { FC } from "react";
import { SubmitExpense } from "./SubmitExpense";
import { SubmitSubscription } from "./SubmitSubscription";

type Props = {
    expenseToAdd: ExpenseToAdd;
    onSuccess: () => void;
};

export const Submit: FC<Props> = (props) =>
    props.expenseToAdd.type === "onetime" ? <SubmitExpense {...props} /> : <SubmitSubscription {...props} />;
