import { Picker } from "@react-native-picker/picker";
import { Currency } from "@/types";
import { Currencies } from "@/constants";

type Props = {
  currency: Currency["code"];
  setCurrency: (currency: Currency["code"]) => void;
};

export const CurrencyPicker = ({ currency, setCurrency }: Props) => (
  <Picker
    selectedValue={currency}
    onValueChange={(chosen) => setCurrency(chosen)}
  >
    {Currencies.map(({ code, symbol }) => (
      <Picker.Item key={code} label={symbol} value={code} />
    ))}
  </Picker>
);
