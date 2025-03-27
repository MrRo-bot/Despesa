import { Navigate, Route, Routes } from "react-router-dom";

import Transactions from "./pages/Transactions";
import Error from "./pages/Error";
import Authentication from "./pages/Authentication";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";
import Overview from "./pages/Overview";
import Layout from "./pages/Layout";

function App() {
  const { data: authData } = useQuery(GET_AUTHENTICATED_USER);

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
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
