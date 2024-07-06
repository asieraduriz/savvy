import { Transaction } from "@/types";
import { RecurrentTransactionItem } from "./RecurrentTransactionItem";
import { SingleTransactionItem } from "./SingleTransactionItem";

export const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    switch (transaction.type) {
        case "single":
            return <SingleTransactionItem transaction={transaction} />;
        case "recurrent":
            return <RecurrentTransactionItem transaction={transaction} />;
    }
};
