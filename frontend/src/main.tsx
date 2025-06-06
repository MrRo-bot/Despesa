import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";

// Access the environment variable
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

if (!BACKEND_URI) {
  console.error("VITE_BACKEND_URI is not defined. Check your .env files.");
  // You might want to throw an error or set a fallback in a real app
}

const client = new ApolloClient({
  uri: BACKEND_URI,
  cache: new InMemoryCache(), //now apollo client supports caching of query data
  credentials: "include", //for sending cookies to server
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
      <ToastContainer />
    </ApolloProvider>
  </BrowserRouter>,
);
