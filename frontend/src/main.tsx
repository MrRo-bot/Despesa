import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";

const backendUri =
  import.meta.env.VITE_GRAPHQL_URI || process.env.REACT_APP_GRAPHQL_URI;

const client = new ApolloClient({
  uri: backendUri,
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
