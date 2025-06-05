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

// Defined allowed origins for development and production
const allowedOrigins = [
  "https://despesa-five.vercel.app", // My production frontend
  "http://localhost:3000", // Common for React/Next.js dev
  "http://localhost:5173", // Common for Vite dev
  // Adding any Vercel preview URLs if needed:
  "https://despesa-git-main-mrro13ot.vercel.app/",
];

app.use(
  "/", // Applies to all routes
  cors<cors.CorsRequest>({
    origin: (origin, callback) => {
      // Allow requests with no origin (like same-origin requests or curl)
      // or if the origin is in our allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`CORS error: Origin ${origin} not allowed`); // Log the blocked origin
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"], // Explicitly allow methods my GraphQL endpoint will use
    allowedHeaders: ["Content-Type", "Authorization", "Accept"], // Common headers for GraphQL
  }),
  express.json(),
  //@ts-ignore // Keeping this because having type issues with expressMiddleware
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);

await connectDB();

console.log(`🚀 Server ready at https://despesa-backend.vercel.app/`);
