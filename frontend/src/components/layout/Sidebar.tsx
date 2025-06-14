import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import { useMutation, useQuery } from "@apollo/client";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { TiChevronRightOutline } from "react-icons/ti";
import { BiPieChart } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";
import { TbPower, TbReportAnalytics, TbUser } from "react-icons/tb";
import { HiOutlineDocumentAdd } from "react-icons/hi";

import { LOGOUT } from "../../graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";

import customToastFunction from "../../utils/Toastify";

import NavItem from "./NavItem";

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
        <div
          className={`text-zinc ${window.innerWidth < 1280 && "absolute bg-zinc-900/90"} z-50 flex h-screen min-w-80 flex-col justify-start bg-zinc-900 bg-[url('/navBg.svg')] bg-[auto_70%] bg-bottom bg-no-repeat px-7 transition-transform xl:static xl:translate-0`}
        >
          <div className="relative flex h-20 w-full items-center justify-start gap-2">
            <div
              onClick={() => {
                sidebarSetter(sidebarStatus ? false : true);
              }}
              className={`absolute top-10 -right-20 cursor-pointer rounded-full border bg-red-600 p-2 transition-all duration-500 ease-in-out xl:top-auto xl:-right-13.5 ${sidebarStatus && "rotate-y-180"} `}
            >
              <TiChevronRightOutline className="h-8 w-8" />
            </div>
            <NavLink className="" to="/">
              <img className="h-9" src="/logo.svg" alt="" />
            </NavLink>
            <NavLink className="ml-1 flex items-center" to="/">
              <h1 className="font-roboto relative text-center text-3xl font-semibold tracking-tighter">
                Despesa
              </h1>
              <span className="mb-1 aspect-square h-6 w-4 overflow-clip text-center">
                <div className="animate-currency flex flex-col">
                  <motion.pre className="inline">$</motion.pre>
                  <motion.pre className="inline">₣</motion.pre>
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
          <nav className="mb-auto flex flex-col gap-8">
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
              navigateTo={"/transaction"}
              title={"Add Transaction"}
              icon={<HiOutlineDocumentAdd className="mr-1 ml-2 h-5 w-5" />}
            />
            <NavItem
              navigateTo={"/reports"}
              title={"Reports"}
              icon={<TbReportAnalytics className="mr-1 ml-2 h-5 w-5" />}
            />
          </nav>
          <footer className="mx-auto my-2 w-max rounded-xl border border-zinc-300 p-2">
            <div className="font-roboto mb-2 text-sm font-bold">
              {!authData?.authUser?.username ? (
                <Skeleton className="h-full min-w-18" />
              ) : (
                (authData?.authUser?.name || "").toUpperCase()
              )}
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="rounded-lg bg-zinc-500 p-1">
                {!authData?.authUser?.profilePicture ? (
                  <TbUser className="h-6 w-6" />
                ) : (
                  <img
                    referrerPolicy="no-referrer"
                    src={authData?.authUser?.profilePicture}
                    className="h-6 w-6"
                    alt=""
                  />
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
      ) : (
        <div className="text-zinc absolute z-50 flex h-screen -translate-x-full flex-col justify-start bg-zinc-900 bg-[url('/navBg.svg')] bg-[auto_70%] bg-bottom bg-no-repeat px-7 transition-transform xl:static xl:translate-0">
          <div className="relative flex h-20 w-full items-center justify-start gap-2">
            <div
              onClick={() => sidebarSetter(sidebarStatus ? false : true)}
              className={`absolute top-10 -right-18 cursor-pointer rounded-full border bg-red-600 p-2 transition-all duration-500 ease-in-out xl:top-auto xl:-right-12 ${sidebarStatus && "rotate-y-180"} `}
            >
              <TiChevronRightOutline className="h-6 w-6" />
            </div>
            <NavLink className="" to="/">
              <img className="h-12" src="/logo.svg" alt="" />
            </NavLink>
          </div>
          <h4 className="mt-7 mb-6 ml-3 tracking-tighter text-zinc-400">Nav</h4>
          <nav className="mb-auto flex flex-col gap-8">
            <div className="tooltip tooltip-right">
              <div className="tooltip-content shadow-main bg-zinc-800">
                <div className="text-base font-black text-orange-400">
                  Overview
                </div>
              </div>

              <NavItem
                navigateTo={"/"}
                title={""}
                icon={<BiPieChart className="mr-1 ml-2 h-7 w-7" />}
              />
            </div>
            <div className="tooltip tooltip-right">
              <div className="tooltip-content shadow-main bg-zinc-800">
                <div className="text-base font-black text-orange-400">
                  Transactions
                </div>
              </div>

              <NavItem
                navigateTo={"/transactions"}
                title={""}
                icon={<GrTransaction className="mr-1 ml-2 h-7 w-7" />}
              />
            </div>
            <div className="tooltip tooltip-right">
              <div className="tooltip-content shadow-main bg-zinc-800">
                <div className="text-base font-black text-orange-400">
                  Add Transaction
                </div>
              </div>

              <NavItem
                navigateTo={"/transaction"}
                title={""}
                icon={<HiOutlineDocumentAdd className="mr-1 ml-2 h-7 w-7" />}
              />
            </div>
            <div className="tooltip tooltip-right">
              <div className="tooltip-content shadow-main bg-zinc-800">
                <div className="text-base font-black text-orange-400">
                  Reports
                </div>
              </div>

              <NavItem
                navigateTo={"/reports"}
                title={""}
                icon={<TbReportAnalytics className="mr-1 ml-2 h-7 w-7" />}
              />
            </div>
          </nav>
          <footer className="mx-auto my-2 w-max rounded-xl border border-zinc-300 p-2">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="rounded-lg bg-zinc-500 p-1">
                {!authData?.authUser?.profilePicture ? (
                  <TbUser className="h-6 w-6" />
                ) : (
                  <img
                    referrerPolicy="no-referrer"
                    src={authData?.authUser?.profilePicture}
                    className="h-6 w-6"
                    alt=""
                  />
                )}
              </div>
              <div className="tooltip tooltip-right">
                <div className="tooltip-content shadow-main bg-zinc-800">
                  <div className="text-base font-black text-orange-400">
                    Logout
                  </div>
                </div>
                <div className="cursor-pointer rounded-lg bg-red-500 p-1">
                  <TbPower
                    className="h-6 w-6 cursor-pointer"
                    onClick={handleLogout}
                  />
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </SkeletonTheme>
  );
};

export default Sidebar;
