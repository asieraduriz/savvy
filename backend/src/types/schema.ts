import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    createdAt: String!
  }

  type Expense {
    id: ID!
    title: String!
    amount: Float!
    category: Category!
    chargedDate: String!
    history: [ExpenseHistory!]!
  }

  type ExpenseHistory {
    amount: Float!
    updatedAt: String!
  }

  type Subscription {
    id: ID!
    title: String!
    amount: Float!
    category: Category!
    startDate: String!
    frequency: String!
    history: [SubscriptionHistory!]!
  }

  type SubscriptionHistory {
    amount: Float!
    updatedAt: String!
  }

  type Category {
    id: ID!
    title: String!
    color: String!
    icon: String
  }

  type Goal {
    id: ID!
    title: String!
    targetAmount: Float!
    category: Category
    linkedExpense: String
    linkedSubscription: String
    startDate: String!
  }

  type Query {
    getUser(id: ID!): User
    getExpenses: [Expense!]
    getSubscriptions: [Subscription!]
    getGoals: [Goal!]
    getCategories: [Category!]
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    login(email: String!, password: String!): String! # Returns JWT token
    createExpense(title: String!, amount: Float!, category: ID!, chargedDate: String!): Expense!
    updateExpense(id: ID!, title: String, amount: Float, category: ID, chargedDate: String): Expense!
    archiveExpense(id: ID!): Boolean!

    createSubscription(title: String!, amount: Float!, category: ID!, startDate: String!, frequency: String!): Subscription!
    updateSubscription(id: ID!, title: String, amount: Float, category: ID, startDate: String, frequency: String): Subscription!
    archiveSubscription(id: ID!): Boolean!

    createGoal(title: String!, targetAmount: Float!, category: ID, linkedExpense: String, linkedSubscription: String): Goal!
    updateGoal(id: ID!, title: String, targetAmount: Float, category: ID, linkedExpense: String, linkedSubscription: String): Goal!
    archiveGoal(id: ID!): Boolean!

    createCategory(title: String!, color: String!, icon: String): Category!
    updateCategory(id: ID!, title: String, color: String, icon: String): Category!
    archiveCategory(id: ID!): Boolean!
  }
`;
