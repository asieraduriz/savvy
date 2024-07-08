import { SubscriptionExpenseFrequency } from "@/types";
import { Picker } from "@react-native-picker/picker";
import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { TextInput } from "../Themed";
import { endOfMonth, startOfMonth, subDays, subMonths, subWeeks, subYears } from "date-fns";

enum DatePresetChoice {
    currentMonth = "Current month",
    previousMonth = "Previous month",
    last = "Last...",
}

function getStartDate(last: number, frequency: SubscriptionExpenseFrequency): Date {
    const today = new Date();
    switch (frequency) {
        case "days":
            return subDays(today, last);
        case "weeks":
            return subWeeks(today, last);
        case "months":
            return subMonths(today, last);
        case "years":
            return subYears(today, last);
        default:
            throw new Error(`Invalid unit type: ${frequency}`);
    }
}

const toStartAndEnd = (preset: DatePresetChoice, last: number, frequency: SubscriptionExpenseFrequency): { start: Date; end: Date } => {
    const today = new Date();
    switch (preset) {
        case DatePresetChoice.currentMonth:
            return { end: today, start: startOfMonth(new Date()) };
        case DatePresetChoice.previousMonth:
            return { end: endOfMonth(subMonths(today, 1)), start: startOfMonth(subMonths(today, 1)) };
        case DatePresetChoice.last:
            return { end: today, start: getStartDate(last, frequency) };
    }
};

type Props = {
    onStartChange: (start: Date) => void;
    onEndChange: (end?: Date) => void;
};

export const DatePresetPicker: FC<Props> = ({ onStartChange, onEndChange }) => {
    const [choice, setChoice] = useState<DatePresetChoice>(DatePresetChoice.currentMonth);

    const [last, setLast] = useState<number>(2);
    const [frequency, setFrequency] = useState<SubscriptionExpenseFrequency>(SubscriptionExpenseFrequency.months);
    const onDateUpdate = useMemo(() => toStartAndEnd(choice, last, frequency), [choice, last, frequency]);

    useEffect(() => {
        onStartChange(onDateUpdate.start)
    }, [onDateUpdate.start])

    useEffect(() => {
        onEndChange(onDateUpdate.end)
    }, [onDateUpdate.end])

    return (
        <Fragment>
            <Picker selectedValue={choice} onValueChange={setChoice}>
                {Object.values(DatePresetChoice).map((preset) => (
                    <Picker.Item key={preset} value={preset} label={preset} />
                ))}
            </Picker>
            {choice === DatePresetChoice.last ? (
                <Fragment>
                    <TextInput value={`${last}`} onChangeText={(value) => setLast(Number(value))} placeholder="Amount" keyboardType="numeric" />
                    <Picker selectedValue={frequency} onValueChange={setFrequency}>
                        {Object.values(SubscriptionExpenseFrequency).map((item) => (
                            <Picker.Item key={item} label={item} value={item} />
                        ))}
                    </Picker>
                </Fragment>
            ) : null}
        </Fragment>
    );
};
