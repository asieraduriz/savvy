import { Dates } from "@/datastructures";
import { ExpensesFilter, AddLinkedMontlyLimitGoalFormType, Interval, Category } from "@/types";
import { AddSpendingFormType } from "@/types/Forms/AddSpendingForm.type";

const Icons = [
  "coffee-to-go",
  "shopping",
  "beach",
  "food-drumstick",
  "glass-cocktail",
  "airplane-takeoff",
  "volleyball",
  "book-open-page-variant",
  "hiking",
];

const now = Dates.Now();
const addExpenseFormStarter: AddSpendingFormType = {
  when: now,
  type: "onetime",
  every: 1,
  interval: Interval.weeks,
};

const addSubscriptionFormStarter: AddSpendingFormType = {
  when: now,
  type: "subscription",
  every: 1,
  interval: Interval.weeks,
};

const addCategoryFormStarter: Omit<Category, 'id'> = {
  name: '',
  iconName: Icons[0],
  color: "white"
}

const addGoalFormStarter: AddLinkedMontlyLimitGoalFormType = {
  limit: 0,
  title: "",
  link: "",
  linkType: "category-goal",
  type: 'linkedMontlyLimit'
};

const starterFilter: ExpensesFilter = {
  start: undefined,
  end: undefined,
  titleQuery: "",
};

export const Defaults = {
  Add: {
    OneTimeExpense: addExpenseFormStarter,
    Subscription: addSubscriptionFormStarter,
    Category: addCategoryFormStarter,
    Goal: addGoalFormStarter,
  },
  Filter: starterFilter,
  Icons: Icons,
  Colors: ["white", "orange", "red", "blue", "yellow", "pink"],
};
