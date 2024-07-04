import { RecurrentTransactionPicker } from "./RecurrentTransactionPicker";
import { SingleTransactionPicker } from "./SingleTransactionPicker";

export * from "./CurrencyPicker";

export const OccurrencyPickers = {
  Single: SingleTransactionPicker,
  Recurrent: RecurrentTransactionPicker,
};
