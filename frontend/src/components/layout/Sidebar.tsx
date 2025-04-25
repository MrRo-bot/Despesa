import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../../graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";

import { TiChevronRightOutline } from "react-icons/ti";
import { BiPieChart } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { TbPower, TbReportAnalytics, TbUser } from "react-icons/tb";
import { ReactNode, useState } from "react";
import customToastFunction from "../Toastify";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const [logout, { client }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const { data: authData } = useQuery(GET_AUTHENTICATED_USER);

  const handleLogout = async () => {
    try {
      customToastFunction(
        `🥲👋 BYE BYE ${authData?.authUser?.username}`,
        "bottom-left",
        "light",
        "",
      );
      await logout();
      client.resetStore(); //clears the cache
    } catch (error) {
      customToastFunction(`${error}`, "top-center", "colored", "error");
    }
  };
  return (
    <div className="text-zinc fixed top-0 bottom-0 left-0 flex h-screen w-80 flex-col justify-start bg-zinc-900 bg-[url('./navBg.svg')] bg-[auto_70%] bg-bottom bg-no-repeat px-7">
      <div
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`absolute top-[2.20%] -right-[8%] cursor-pointer rounded-full border bg-red-600 p-2 transition-all duration-500 ease-in-out ${!isSidebarOpen && "rotate-y-180"} `}
      >
        <TiChevronRightOutline className="h-8 w-8 text-zinc-50" />
      </div>

      <div className="flex h-20 w-full items-center justify-start gap-2">
        <NavLink className="" to="/">
          <img className="h-9" src="/logo.svg" alt="" />
        </NavLink>
        <NavLink className="ml-1 flex items-center" to="/">
          <h1 className="font-roboto relative text-center text-3xl font-semibold tracking-tighter text-zinc-50">
            Despesa
          </h1>
          <span className="mb-1 aspect-square h-6 w-4 overflow-clip text-center">
            <div className="animate-currency flex flex-col text-zinc-50">
              <motion.pre className="inline">$</motion.pre>
              <motion.pre className="inline">₣</motion.pre>
              <motion.pre className="inline">₩</motion.pre>
              <motion.pre className="inline">€</motion.pre>
              <motion.pre className="inline">₱</motion.pre>
              <motion.pre className="inline">₹</motion.pre>
              <motion.pre className="inline">₽</motion.pre>
              <motion.pre className="inline">₿</motion.pre>
            </div>
          </span>
        </NavLink>
      </div>
      <h4 className="mt-7 mb-6 text-sm tracking-tighter text-zinc-400">
        Navigation
      </h4>
      <nav className="mb-auto flex flex-col gap-6">
        <NavItem
          navigateTo={"/"}
          title={"Dashboard"}
          icon={<BiPieChart className="mr-1 ml-2 h-5 w-5" />}
        />
        <NavItem
          navigateTo={"/transactions"}
          title={"Transactions"}
          icon={<GrTransaction className="mr-1 ml-2 h-5 w-5" />}
        />
        <NavItem
          navigateTo={"/reports"}
          title={"Reports"}
          icon={<TbReportAnalytics className="mr-1 ml-2 h-5 w-5" />}
        />
      </nav>
      <footer className="mx-auto my-2 w-max rounded-xl border border-zinc-300 p-2 text-zinc-50">
        <div className="flex items-center justify-center gap-2">
          <div className="cursor-pointer rounded-lg bg-zinc-500 p-1">
            {authData?.authUser ? (
              <img
                src={authData?.authUser?.profilePicture}
                className="h-6 w-6"
                alt=""
              />
            ) : (
              <TbUser className="h-6 w-6" />
            )}
          </div>

          <div className="cursor-pointer rounded-lg bg-red-500 p-1">
            <TbPower
              className="h-6 w-6 cursor-pointer"
              onClick={handleLogout}
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavItem = ({
  navigateTo,
  title,
  icon,
}: {
  navigateTo: string;
  title: string;
  icon: ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <NavLink
        className={({ isActive, isPending }) =>
          `${isPending ? "text-blue-300" : isActive ? "text-zinc-50" : "text-zinc-500"} flex items-center justify-start transition-colors duration-400 ease-in-out`
        }
        to={navigateTo}
      >
        {icon}
        <span className="font-roboto ml-2 text-lg tracking-tighter">
          {title}
        </span>
      </NavLink>
    </motion.div>
  );
};

export default Sidebar;
