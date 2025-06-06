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

const allowedOrigins = [
  "http://localhost:3000", // For local development
  "http://localhost:5173", // For local development
];

// Add Vercel deployment URLs dynamically
if (process.env.VERCEL_URL) {
  allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
}

// Adding production custom domain if present
if (process.env.NODE_ENV === "production" && process.env.PRODUCTION_DOMAIN) {
  allowedOrigins.push(`https://${process.env.PRODUCTION_DOMAIN}`);
}

app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: (origin, callback) => {
      // Allow requests from the same origin as the backend (for Vercel deployments)
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin === process.env.VERCEL_URL
      ) {
        callback(null, true);
      } else {
        console.error(`CORS error: Origin ${origin} not allowed`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  }),
  express.json(),
  //@ts-ignore // Keeping this because having type issues with expressMiddleware
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

await connectDB();

await new Promise<void>(
  (resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve) //for vercel if port is different
);

// A simple health check route (optional but good practice)
app.get("/health", (_, res) => {
  res.status(200).send("Backend is healthy!");
});
