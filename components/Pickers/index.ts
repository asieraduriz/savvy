import { RecurrentTransactionPicker } from "./RecurrentTransactionPicker";
import { SingleTransactionPicker } from "./SingleTransactionPicker";

export * from "./CurrencyPicker";

export const RecurrencyPickers = {
  Single: SingleTransactionPicker,
  Recurrent: RecurrentTransactionPicker,
};
