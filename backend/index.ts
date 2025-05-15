import { ApolloServer } from "@apollo/server";

import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import passport from "passport";
import session from "express-session";
import { buildContext } from "graphql-passport";
import connectMongo from "connect-mongodb-session";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";
import { connectDB } from "./db/connectDB.js";
import { configurePassport } from "./passport/passport.config.js";

dotenv.config();
configurePassport();

const app = express();

const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI || "",
  collection: "sessions",
});

store.on("error", (err: any) => console.error(err));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: false, // this specifies whether to save the session to the store on every request (dont want multiple sessions of same user)
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14, //for preventing xss attack (cross-site scripting)
      httpOnly: true, //14 days session time limit
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  //@ts-ignore
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);

await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);
