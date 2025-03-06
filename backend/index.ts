import { ApolloServer } from "@apollo/server";

import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import mergedResolvers from "./resolvers/index";
import mergedTypeDefs from "./typeDefs/index";
import { connectDB } from "./db/connectDB";

dotenv.config();
const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

//@ts-ignore
await server.start();

app.use(
  "/",
  cors<cors.CorsRequest>(),
  express.json(),
  //@ts-ignore
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  })
);

//@ts-ignore
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);

//@ts-ignore
await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/`);
