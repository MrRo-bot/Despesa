import { ApolloServer } from "@apollo/server";

import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import mergedResolvers from "./resolvers/index";
import mergedTypeDefs from "./typeDefs/index";

dotenv.config();
const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

//@ts-expect-error
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

//@ts-expect-error
await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);

console.log(`🚀 Server ready at http://localhost:4000/`);
