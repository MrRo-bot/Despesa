import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import Transaction from "./pages/Transaction";
import Error from "./pages/Error";
import Authentication from "./pages/Authentication";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";

function App() {
  const { data } = useQuery(GET_AUTHENTICATED_USER);

  console.log(data);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            data?.authUser ? <Home /> : <Navigate to="/authentication" />
          }
        />
        <Route
          path="/authentication"
          element={!data?.authUser ? <Authentication /> : <Navigate to="/" />}
        />
        <Route
          path="/transaction/:id"
          element={
            data?.authUser ? <Transaction /> : <Navigate to="/authentication" />
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
