import { Dates } from "@/datastructures";
import { FC, useEffect } from "react";
import { Button } from "react-native";
import { Text, View } from "../Themed";
import { useFormikContext } from "formik";
import { ExpenseToAdd } from "@/types";


export const SubmitSubscriptionButton: FC = () => {
    const { values, setFieldValue, handleSubmit, isValid, isSubmitting } = useFormikContext<ExpenseToAdd>();

    useEffect(() => {
        if (values.when && values.every && values.interval) {
            const occurrences = Dates.occurrencesInInterval(values.when, Dates.Now(), { every: values.every, interval: values.interval });
            setFieldValue("pastSubscriptionChargeDates", occurrences);
        }
    }, [values.when, values.every, values.interval]);

    return (
        <View>
            {values.amount && values.pastSubscriptionChargeDates?.map((date) => (
                <Text key={date.getTime()}>{Dates.toFormat(date)}: {values.amount}</Text>
            ))}
            <Button title="Add subscription" onPress={() => handleSubmit()} disabled={!isValid || isSubmitting} />
        </View>
    );
};
