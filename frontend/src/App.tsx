import { useLayoutEffect, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import { useNavigatorOnLine } from "./hooks/useNavigatorOnline";
import customToastFunction from "./utils/Toastify";

import Transactions from "./pages/Transactions";
import Error from "./pages/Error";
import Authentication from "./pages/Authentication";
import Overview from "./pages/Overview";
import Layout from "./pages/Layout";
import AddTransaction from "./pages/AddTransaction";
import Reports from "./pages/Reports";

function App() {
  const firstUpdate = useRef(true);

  const { data: authData } = useQuery(GET_AUTHENTICATED_USER);
  const isOnline = useNavigatorOnLine();

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    customToastFunction(
      isOnline ? "We're back Online 🛜✔️" : "Offline 🛜❌",
      "top-center",
      "light",
      "",
    );
  }, [isOnline]);

  return (
    <>
      <Routes>
        <Route
          path="/authentication"
          element={
            !authData?.authUser ? <Authentication /> : <Navigate to="/" />
          }
        />
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              authData?.authUser ? (
                <Overview />
              ) : (
                <Navigate to="/authentication" />
              )
            }
          />
          <Route
            path="/transactions"
            element={
              authData?.authUser ? (
                <Transactions />
              ) : (
                <Navigate to="/authentication" />
              )
            }
          />
          <Route
            path="/transaction"
            element={
              authData?.authUser ? (
                <AddTransaction />
              ) : (
                <Navigate to="/authentication" />
              )
            }
          />
          <Route
            path="/reports"
            element={
              authData?.authUser ? (
                <Reports />
              ) : (
                <Navigate to="/authentication" />
              )
            }
          />
          <Route
            path="*"
            element={
              authData?.authUser ? <Error /> : <Navigate to="/authentication" />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
