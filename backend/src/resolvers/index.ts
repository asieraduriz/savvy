import { Expense, Subscription, Category, Goal } from "../models";
import { UserInputError, AuthenticationError } from "apollo-server-express";

export const resolvers = {
  Query: {
    getExpenses: async (_: any, { filter }: { filter?: any }, context: { user?: { id: string } }) => {
      if (!context.user) throw new AuthenticationError("You must be logged in");
      // Implement filtering logic here
      return await Expense.find({ ...filter, user: context.user.id }).populate("category");
    },
    getSubscriptions: async (_: any, __: any, context: { user?: { id: string } }) => {
      if (!context.user) throw new AuthenticationError("You must be logged in");
      return await Subscription.find({ user: context.user.id }).populate("category");
    },
    getCategories: async (_: any, __: any, context: { user?: { id: string } }) => {
      if (!context.user) throw new AuthenticationError("You must be logged in");
      return await Category.find({ user: context.user.id });
    },
    getGoals: async (_: any, __: any, context: { user?: { id: string } }) => {
      if (!context.user) throw new AuthenticationError("You must be logged in");
      return await Goal.find({ user: context.user.id });
    },
  },
  Mutation: {
    createExpense: async (_: any, { input }: { input: any }, context: { user?: { id: string } }) => {
      if (!context.user) throw new AuthenticationError("You must be logged in");
      const newExpense = new Expense({ ...input, user: context.user.id });
      await newExpense.save();
      return newExpense;
    },
    updateExpense: async (_: any, { id, input }: { id: string; input: any }, context: { user?: { id: string } }) => {
      if (!context.user) throw new AuthenticationError("You must be logged in");
      const expense = await Expense.findOneAndUpdate({ _id: id, user: context.user.id }, input, { new: true });
      if (!expense) throw new UserInputError("Expense not found");
      // Implement history tracking logic here
      return expense;
    },
    archiveExpense: async (_: any, { id }: { id: string }, context: { user?: { id: string } }) => {
      if (!context.user) throw new AuthenticationError("You must be logged in");
      const expense = await Expense.findOneAndUpdate({ _id: id, user: context.user.id }, { archived: true }, { new: true });
      if (!expense) throw new UserInputError("Expense not found");
      return expense;
    },
    createSubscription: async (_: any, { input }: { input: any }, context: { user?: { id: string } }) => {
      if (!context.user) throw new AuthenticationError("You must be logged in");
      const newSubscription = new Subscription({ ...input, user: context.user.id });
      await newSubscription.save();
      return newSubscription;
    },
    // Implement other mutation resolvers (updateSubscription, archiveSubscription, etc.)
  },
};
