import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const Layout = () => {
  return (
    <div className="no-scrollbar flex">
      <Sidebar />
      <main className="ml-80 h-screen w-full overflow-y-scroll">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
