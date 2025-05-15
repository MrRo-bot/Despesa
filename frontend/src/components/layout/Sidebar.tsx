import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../../graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";

import { TiChevronRightOutline } from "react-icons/ti";
import { BiPieChart } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { TbPower, TbReportAnalytics, TbUser } from "react-icons/tb";
import customToastFunction from "../Toastify";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NavItem from "./NavItem";
import React from "react";

const Sidebar = ({
  sidebarStatus,
  sidebarSetter,
}: {
  sidebarStatus: boolean;
  sidebarSetter: React.Dispatch<boolean>;
}) => {
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
    <SkeletonTheme
      duration={1}
      baseColor="rgba(220,220,220,0.2)"
      customHighlightBackground="linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255, 127, 144,0.25)15%, rgba(196, 153, 252,0.35)40%, rgba(255, 139, 152,0.45) 60%, rgba(255, 222, 148,0.25)85%, rgba(255,255,255,0.1) 100%)"
    >
      {sidebarStatus ? (
        <div className="text-zinc flex h-screen min-w-80 flex-col justify-start bg-zinc-900 bg-[url('./navBg.svg')] bg-[auto_70%] bg-bottom bg-no-repeat px-7 transition-transform">
          <div className="relative flex items-center justify-start w-full h-20 gap-2">
            <div
              onClick={() => sidebarSetter(sidebarStatus ? false : true)}
              className={`absolute -right-13.5 cursor-pointer rounded-full border bg-red-600 p-2 transition-all duration-500 ease-in-out ${sidebarStatus && "rotate-y-180"} `}
            >
              <TiChevronRightOutline className="w-8 h-8 text-zinc-50" />
            </div>
            <NavLink className="" to="/">
              <img className="h-9" src="/logo.svg" alt="" />
            </NavLink>
            <NavLink className="flex items-center ml-1" to="/">
              <h1 className="relative text-3xl font-semibold tracking-tighter text-center font-roboto text-zinc-50">
                Despesa
              </h1>
              <span className="w-4 h-6 mb-1 text-center aspect-square overflow-clip">
                <div className="flex flex-col animate-currency text-zinc-50">
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
          <h4 className="mb-6 text-sm tracking-tighter mt-7 text-zinc-400">
            Navigation
          </h4>
          <nav className="flex flex-col gap-6 mb-auto">
            <NavItem
              navigateTo={"/"}
              title={"Dashboard"}
              icon={<BiPieChart className="w-5 h-5 ml-2 mr-1" />}
            />
            <NavItem
              navigateTo={"/transactions"}
              title={"Transactions"}
              icon={<GrTransaction className="w-5 h-5 ml-2 mr-1" />}
            />
            <NavItem
              navigateTo={"/reports"}
              title={"Reports"}
              icon={<TbReportAnalytics className="w-5 h-5 ml-2 mr-1" />}
            />
          </nav>
          <footer className="p-2 mx-auto my-2 border w-max rounded-xl border-zinc-300 text-zinc-50">
            <div className="mb-2 text-sm font-bold font-roboto">
              {!authData?.authUser?.username ? (
                <Skeleton className="h-full min-w-18" />
              ) : (
                (authData?.authUser?.username || "").toUpperCase()
              )}
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="p-1 rounded-lg bg-zinc-500">
                {!authData?.authUser?.profilePicture ? (
                  <TbUser className="w-6 h-6" />
                ) : (
                  <img
                    referrerPolicy="no-referrer"
                    src={authData?.authUser?.profilePicture}
                    className="w-6 h-6"
                    alt=""
                  />
                )}
              </div>

              <div className="p-1 bg-red-500 rounded-lg cursor-pointer">
                <TbPower
                  className="w-6 h-6 cursor-pointer"
                  onClick={handleLogout}
                />
              </div>
            </div>
          </footer>
        </div>
      ) : (
        <div className="text-zinc flex h-screen flex-col justify-start bg-zinc-900 bg-[url('./navBg.svg')] bg-[auto_70%] bg-bottom bg-no-repeat px-7 transition-transform">
          <div className="relative flex items-center justify-start w-full h-20 gap-2">
            <div
              onClick={() => sidebarSetter(sidebarStatus ? false : true)}
              className={`absolute -right-12 cursor-pointer rounded-full border bg-red-600 p-2 transition-all duration-500 ease-in-out ${sidebarStatus && "rotate-y-180"} `}
            >
              <TiChevronRightOutline className="w-6 h-6 text-zinc-50" />
            </div>
            <NavLink className="" to="/">
              <img className="h-12" src="/logo.svg" alt="" />
            </NavLink>
          </div>
          <h4 className="mb-6 ml-3 tracking-tighter mt-7 text-zinc-400">Nav</h4>
          <nav className="flex flex-col gap-6 mb-auto">
            <NavItem
              navigateTo={"/"}
              title={""}
              icon={<BiPieChart className="ml-2 mr-1 h-7 w-7" />}
            />
            <NavItem
              navigateTo={"/transactions"}
              title={""}
              icon={<GrTransaction className="ml-2 mr-1 h-7 w-7" />}
            />
            <NavItem
              navigateTo={"/reports"}
              title={""}
              icon={<TbReportAnalytics className="ml-2 mr-1 h-7 w-7" />}
            />
          </nav>
          <footer className="p-2 mx-auto my-2 border w-max rounded-xl border-zinc-300 text-zinc-50">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="p-1 rounded-lg bg-zinc-500">
                {!authData?.authUser?.profilePicture ? (
                  <TbUser className="w-6 h-6" />
                ) : (
                  <img
                    referrerPolicy="no-referrer"
                    src={authData?.authUser?.profilePicture}
                    className="w-6 h-6"
                    alt=""
                  />
                )}
              </div>

              <div className="p-1 bg-red-500 rounded-lg cursor-pointer">
                <TbPower
                  className="w-6 h-6 cursor-pointer"
                  onClick={handleLogout}
                />
              </div>
            </div>
          </footer>
        </div>
      )}
    </SkeletonTheme>
  );
};

export default Sidebar;
