import { DateRangePicker } from "./DateRangePicker";
import { DatePresetPicker } from "./DatePresetPicker";
import { SubscriptionToAddPicker } from "./SubscriptionToAddPicker";
import { OneTimeExpenseToAddPicker } from "./OneTimeExpenseToAddPicker";
import { RangeSlider } from "./RangeSlider";

export const Pickers = {
  OneTime: OneTimeExpenseToAddPicker,
  Subscription: SubscriptionToAddPicker,
  DateRange: DateRangePicker,
  DatePreset: DatePresetPicker,
  RangeSlider,
};
