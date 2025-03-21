import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import Transaction from "./pages/Transaction";
import Error from "./pages/Error";
import Authentication from "./pages/Authentication";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";

function App() {
  const { data: authData } = useQuery(GET_AUTHENTICATED_USER);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authData?.authUser ? <Home /> : <Navigate to="/authentication" />
          }
        />
        <Route
          path="/authentication"
          element={
            !authData?.authUser ? <Authentication /> : <Navigate to="/" />
          }
        />
        <Route
          path="/transaction/:id"
          element={
            authData?.authUser ? (
              <Transaction />
            ) : (
              <Navigate to="/authentication" />
            )
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
