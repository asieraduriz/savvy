import { DateRangePicker } from "./DateRangePicker";
import { DatePresetPicker } from "./DatePresetPicker";
import { OneTimeExpenseToAddPicker } from "./OneTimeExpenseToAddPicker";
import { RangeSlider } from "./RangeSlider";
import { DatePicker } from "./DatePicker";
import { IntervalPicker } from "./IntervalPicker";

export const Pickers = {
  OneTime: OneTimeExpenseToAddPicker,
  DateRange: DateRangePicker,
  DatePreset: DatePresetPicker,
  RangeSlider,
  Date: DatePicker,
  Interval: IntervalPicker,
};
