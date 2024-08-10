import { DateRangePicker } from "./DateRangePicker";
import { DatePresetPicker } from "./DatePresetPicker";
import { OneTimeExpenseToAddPicker } from "./OneTimeExpenseToAddPicker";
import { RangeSlider } from "./RangeSlider";
import { DatePicker } from "./DatePicker";
import { IntervalPicker } from "./IntervalPicker";
import { CategoryPicker } from "./CategoryPicker";

export const Pickers = {
  CategoryPicker: CategoryPicker,
  OneTime: OneTimeExpenseToAddPicker,
  DateRange: DateRangePicker,
  DatePreset: DatePresetPicker,
  RangeSlider,
  Date: DatePicker,
  Interval: IntervalPicker,
};
