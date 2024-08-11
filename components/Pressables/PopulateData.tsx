import { Defaults } from "@/constants";
import { useCategories } from "@/contexts/Categories/Provider";
import { useGoals } from "@/contexts/Goals/Provider";
import { useSpendings } from "@/contexts/Spendings/Provider";
import { Dates } from "@/datastructures";
import { AddLinkedMontlyLimitGoalFormType, Interval } from "@/types";
import { AddSpendingFormType } from "@/types/Forms/AddSpendingForm.type";
import { Button } from "react-native";

export const PopulateApp = () => {
  const { createCategory } = useCategories();
  const { createSpending } = useSpendings();
  const { createGoal } = useGoals();

  const onPress = async () => {

    const category1 = await createCategory({
      name: 'Beauty',
      color: "orange",
      iconName: Defaults.Icons[0]
    })
    const category2 = await createCategory({

      name: "Cafes",
      color: "orange",
      iconName: Defaults.Icons[2]
    });

    const category3 = await createCategory({
      name: "Leisure",
      color: "green",
      iconName: Defaults.Icons[3],
    });

    const category4 = await createCategory({

      name: "Health",
      color: "white",
      iconName: Defaults.Icons[5],
    });

    const oneTimeExpense1: AddSpendingFormType = {
      title: "Haircut",
      amount: 35,
      categoryId: category1!.id,
      when: Dates.subDays(Dates.Now(), 5),
      type: "onetime",
      every: 1,
      interval: Interval.weeks,
    };

    const oneTimeExpense2: AddSpendingFormType = {
      title: "Coffee",
      amount: 8,
      categoryId: category2!.id,
      when: Dates.subDays(Dates.Now(), 11),
      type: "onetime",
      every: 1,
      interval: Interval.weeks,
    };

    const oneTimeExpense3: AddSpendingFormType = {
      title: "Coffee",
      amount: 8,
      categoryId: category2!.id,
      when: Dates.subDays(Dates.Now(), 3),
      type: "onetime",
      every: 1,
      interval: Interval.weeks,
    };
    await createSpending(oneTimeExpense1);
    await createSpending(oneTimeExpense2);
    await createSpending(oneTimeExpense3);

    const subscription1: AddSpendingFormType = {
      title: "Netflix",
      amount: 9,
      every: 1,
      interval: Interval.months,
      when: Dates.startOfMonth(Dates.Now()),
      type: "subscription",
      categoryId: category3!.id,
      pastSubscriptionChargeDates: [Dates.startOfMonth(Dates.Now())],
    };

    await createSpending(subscription1);

    const subscription2: AddSpendingFormType = {
      title: "Kombucha",
      amount: 72,
      every: 3,
      interval: Interval.weeks,
      when: Dates.startOfMonth(Dates.subDays(Dates.Now(), 84)),
      type: "subscription",
      categoryId: category4!.id,
      pastSubscriptionChargeDates: [
        Dates.subDays(Dates.Now(), 84),
        Dates.subDays(Dates.Now(), 63),
        Dates.subDays(Dates.Now(), 42),
        Dates.subDays(Dates.Now(), 21),
        Dates.Now(),
      ],
    };

    await createSpending(subscription2);

    const goal1: AddLinkedMontlyLimitGoalFormType = {
      title: "Coffee goal",
      linkType: "category-goal",
      limit: 15,
      link: category2!.name,
      type: 'linkedMontlyLimit'
    };

    const goal2: AddLinkedMontlyLimitGoalFormType = {
      title: "Beauty goal",
      linkType: "category-goal",
      limit: 55,
      link: category1!.name,
      type: 'linkedMontlyLimit'
    };

    await createGoal(goal1);
    await createGoal(goal2);
  };

  return <Button title="Add some data" onPress={onPress} />;
};
