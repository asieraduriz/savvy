import { FrequencyRecurrence, TimespanFrequencyRecurrence, TransactionRecurrenceTypes } from "@/types";

export const Defaults = {
    FrequencyRecurrence: {
        type: TransactionRecurrenceTypes.frequency,
        frequency: TimespanFrequencyRecurrence.daily,
        startDate: new Date(),
    } as FrequencyRecurrence,
    SingleTransactionDate: new Date(),
}