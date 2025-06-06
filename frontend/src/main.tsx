import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";

export function getApolloServerUri() {
  if (process.env.NODE_ENV === "production") {
    // In a production build, use the production URI
    return import.meta.env.VITE_REACT_APP_GRAPHQL_URI_PROD;
  } else {
    // In a development build, use the development URI
    return import.meta.env.VITE_REACT_APP_GRAPHQL_URI_DEV;
  }
}

const client = new ApolloClient({
  uri: getApolloServerUri(),
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
