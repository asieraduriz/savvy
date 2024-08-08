import { Defaults } from "@/constants";
import { useGoals } from "@/contexts/Goals/Provider";
import { useSpendings } from "@/contexts/Spendings/Provider";
import { Dates } from "@/datastructures";
import { Transformers } from "@/transformers";
import { AddGoalFormType, Interval } from "@/types";
import { AddSpendingFormType } from "@/types/Forms/AddSpendingForm.type";
import { Button } from "react-native";

export const PopulateApp = () => {
  const { createExpense, createSubscription } = useSpendings();
  const { createGoal } = useGoals();

  const onPress = async () => {
    const oneTimeExpense1: AddSpendingFormType = {
      title: "Haircut",
      amount: 35,
      category: "Beauty",
      categoryColor: "orange",
      categoryIcon: Defaults.Icons[0],
      when: Dates.subDays(Dates.Now(), 5),
      type: "onetime",
      every: 1,
      interval: Interval.weeks,
    };

    const oneTimeExpense2: AddSpendingFormType = {
      title: "Coffee",
      amount: 8,
      category: "Cafes",
      categoryColor: "orange",
      categoryIcon: Defaults.Icons[2],
      when: Dates.subDays(Dates.Now(), 11),
      type: "onetime",
      every: 1,
      interval: Interval.weeks,
    };

    const oneTimeExpense3: AddSpendingFormType = {
      title: "Coffee",
      amount: 8,
      category: "Cafes",
      categoryColor: "orange",
      categoryIcon: Defaults.Icons[2],
      when: Dates.subDays(Dates.Now(), 3),
      type: "onetime",
      every: 1,
      interval: Interval.weeks,
    };

    await createExpense(Transformers.toOneTimeExpense(oneTimeExpense1));
    await createExpense(Transformers.toOneTimeExpense(oneTimeExpense2));
    await createExpense(Transformers.toOneTimeExpense(oneTimeExpense3));

    const subscription1: AddSpendingFormType = {
      title: "Netflix",
      amount: 9,
      every: 1,
      interval: Interval.months,
      when: Dates.startOfMonth(Dates.Now()),
      type: "subscription",
      category: "Leisure",
      categoryColor: "green",
      categoryIcon: Defaults.Icons[3],
    };

    const sub1 = await createSubscription(
      Transformers.toSubscription(subscription1)
    );
    const sub1Id = sub1?.id;
    await createExpense(
      Transformers.toSubscriptionExpense(subscription1, sub1!.start, sub1Id!)
    );

    const subscription2: AddSpendingFormType = {
      title: "Kombucha",
      amount: 72,
      every: 3,
      interval: Interval.weeks,
      when: Dates.startOfMonth(Dates.subMonths(Dates.Now(), 3)),
      type: "subscription",
      category: "Health",
      categoryColor: "white",
      categoryIcon: Defaults.Icons[5],
    };

    const sub2 = await createSubscription(
      Transformers.toSubscription(subscription2)
    );
    const sub2Id = sub2?.id;
    await createExpense(
      Transformers.toSubscriptionExpense(
        subscription2,
        Dates.addDays(sub2!.start, 30),
        sub2Id!
      )
    );
    await createExpense(
      Transformers.toSubscriptionExpense(
        subscription2,
        Dates.addDays(sub2!.start, 60),
        sub2Id!
      )
    );
    await createExpense(
      Transformers.toSubscriptionExpense(
        subscription2,
        Dates.addDays(sub2!.start, 90),
        sub2Id!
      )
    );

    const goal1: AddGoalFormType = {
      title: "Coffee goal",
      type: "title-goal",
      limit: 15,
      link: oneTimeExpense2.category!,
    };

    const goal2: AddGoalFormType = {
      title: "Beauty goal",
      type: "category-goal",
      limit: 55,
      link: oneTimeExpense1.category!,
    };

    await createGoal(Transformers.toGoal(goal1));
    await createGoal(Transformers.toGoal(goal2));
  };

  return <Button title="Add some data" onPress={onPress} />;
};
