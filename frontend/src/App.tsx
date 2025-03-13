import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";

import Transaction from "./pages/Transaction";
import Error from "./pages/Error";
import Authentication from "./pages/Authentication";

function App() {
  const authUser = true;
  return (
    <>
      {authUser && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/transaction/:id" element={<Transaction />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
