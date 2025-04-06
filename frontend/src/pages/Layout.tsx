import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { useEffect, useState } from "react";
import FullPageLoading from "../components/layout/FullPageLoading";

const Layout = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading(true);
    }, 1000);

    return () => {
      clearInterval(interval);
      setLoading(false);
    };
  }, [location]);

  return (
    <>
      {!loading ? (
        <FullPageLoading />
      ) : (
        <div className="no-scrollbar flex">
          <Sidebar />
          <main className="ml-80 h-screen w-full overflow-y-scroll">
            <Header />
            <Outlet />
          </main>
        </div>
      )}
    </>
  );
};

export default Layout;
