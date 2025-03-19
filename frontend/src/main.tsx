import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import Background from "./components/Background.tsx";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(), //now apollo client supports caching of query data
  credentials: "include", //for sending cookies to server
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Background>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Background>
  </BrowserRouter>
);
