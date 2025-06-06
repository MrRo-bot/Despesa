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

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined");
}
if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is not defined");
}

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
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
  express.json(),
  //@ts-ignore //keep this because having type issues with expressMiddleware
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

await connectDB();

const port = parseInt(process.env.PORT || "4000", 10);
if (isNaN(port)) {
  throw new Error("PORT environment variable must be a valid number");
}

await new Promise<void>((resolve, reject) => {
  httpServer.listen({ port }, resolve).on("error", reject);
}).catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

if (process.env.NODE_ENV === "production" && process.env.VERCEL) {
  //@ts-ignore
  app.get("/", (_, res: express.Response) => res.send("Backend is running"));
}

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
