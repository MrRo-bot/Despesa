import { ApolloServer } from "@apollo/server";

import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import passport from "passport";
import session from "express-session";
import { buildContext } from "graphql-passport";

import connectMongo from "connect-mongodb-session";

import mergedResolvers from "./src/resolvers/index.js";
import mergedTypeDefs from "./src/typeDefs/index.js";
import { connectDB } from "./src/db/connectDB.js";
import { configurePassport } from "./src/passport/passport.config.js";

dotenv.config();
configurePassport();

const app = express();

const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
  uri: process.env.MONGO_URI || "",
  collection: "sessions",
});

store.on("error", (err: any) => {
  console.error("MongoDB session store error:", err);
  // Optionally, add logic to handle critical errors (e.g., notify admin, exit process)
});
app.use(
  session({
    secret: process.env.SESSION_SECRET || "",
    resave: false, // this specifies whether to save the session to the store on every request (dont want multiple sessions of same user)
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14, //for preventing xss attack (cross-site scripting)
      httpOnly: true, //14 days session time limit
      secure: process.env.NODE_ENV === "production", // Only set secure cookies in production
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

// A simple health check route (optional but good practice)
app.get("/health", (_, res) => {
  res.status(200).send("Backend is healthy!");
});

await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: ["http://localhost:3000", "https://despesa-frontend.netlify.app"],
    credentials: true,
  }),
  express.json(),
  //@ts-ignore //keep this because having type issues with expressMiddleware
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

await connectDB();

app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
}); //vercel

await new Promise<void>((resolve, reject) => {
  httpServer.listen({ port: 4000 }, resolve).on("error", reject);
}).catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

const gracefulShutdown = async () => {
  console.log("Shutting down server...");
  await server.stop();
  httpServer.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
