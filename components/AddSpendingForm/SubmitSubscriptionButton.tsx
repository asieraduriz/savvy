import { Dates } from "@/datastructures";
import { FC, useEffect } from "react";
import { Text, View } from "../Themed";
import { useFormikContext } from "formik";
import { Pressables } from "../Pressables";
import { useAnimateToggle } from "@/hooks";
import { AddSpendingFormType } from "@/types/Forms/AddSpendingForm.type";

type Props = {
  animate: ReturnType<typeof useAnimateToggle>[0];
};

export const SubmitSubscriptionButton: FC<Props> = ({ animate }) => {
  const { values, setFieldValue, handleSubmit, isValid, isSubmitting } =
    useFormikContext<AddSpendingFormType>();

  useEffect(() => {
    if (values.when && values.every && values.interval) {
      const occurrences = Dates.occurrencesInInterval(
        values.when,
        Dates.Now(),
        { every: values.every, interval: values.interval }
      );
      setFieldValue("pastSubscriptionChargeDates", occurrences);
    }
  }, [values.when, values.every, values.interval, setFieldValue]);

  return (
    <View>
      {values.amount &&
        values.pastSubscriptionChargeDates?.map((date) => (
          <Text key={date.getTime()}>
            {Dates.toFormat(date)}: {values.amount}
          </Text>
        ))}
      <Pressables.Animated
        title="Create subscription"
        onPress={() => handleSubmit()}
        disabled={!isValid || isSubmitting}
        animate={animate}
        isLoading={isSubmitting}
      />
    </View>
  );
};
