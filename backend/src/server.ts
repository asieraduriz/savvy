import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import mongoose from "mongoose";
import { typeDefs } from "./types/schema";
import { resolvers } from "./resolvers";
import jwt from "jsonwebtoken";

interface UserContext {
  user?: {
    id: string;
    email: string;
  };
}

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app: express.Application = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }): Promise<UserContext> => {
      // Get the user token from the headers
      const token = req.headers.authorization || "";
      // Try to retrieve a user with the token
      const user = getUser(token);
      // Add the user to the context
      return { user: user };
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

  // Connect to MongoDB
  mongoose.connect("mongodb://localhost:27017/expense_tracker");

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB");
  });
}

// Helper function to get user from token
function getUser(token: string) {
  if (token) {
    try {
      return jwt.verify(token, "YOUR_SECRET_KEY") as { id: string; email: string };
    } catch (error) {
      return null;
    }
  }
}

startApolloServer(typeDefs, resolvers);
