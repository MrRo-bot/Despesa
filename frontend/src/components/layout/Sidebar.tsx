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
  sidebarStatus: boolean | undefined;
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
          className={`text-zinc ${window.innerWidth < 1280 && "absolute bg-zinc-900/95"} md:py-auto z-50 flex h-full min-w-60 flex-col justify-start bg-zinc-900 bg-[url('/navBg.svg')] bg-[auto_70%] bg-bottom bg-no-repeat px-3 py-5 transition-transform md:min-w-80 md:px-7 xl:static xl:h-screen xl:translate-0`}
        >
          <div className="relative flex items-center justify-start w-full h-12 gap-2 md:h-20">
            <div
              onClick={() => {
                sidebarSetter(!sidebarStatus);
              }}
              className={`absolute top-10.5 -right-12 cursor-pointer rounded-full border bg-red-600 p-1 transition-all duration-500 ease-in-out md:-right-20 md:p-2 xl:top-auto xl:-right-13.5 ${sidebarStatus && "rotate-y-180"} `}
            >
              <TiChevronRightOutline className="w-6 h-6" />
            </div>
            <NavLink className="" to="/">
              <img className="h-7 md:h-9" src="/logo.svg" alt="" />
            </NavLink>
            <NavLink className="flex items-center ml-1" to="/">
              <h1 className="relative text-xl font-semibold tracking-tighter text-center font-roboto md:text-3xl">
                Despesa
              </h1>
              <span className="w-4 h-6 mb-1 text-center aspect-square overflow-clip">
                <div className="flex flex-col animate-currency">
                  <motion.pre className="inline">$</motion.pre>
                  <motion.pre className="inline">€</motion.pre>
                  <motion.pre className="inline">₹</motion.pre>
                  <motion.pre className="inline">¥</motion.pre>
                  <motion.pre className="inline">£</motion.pre>
                </div>
              </span>
            </NavLink>
          </div>
          <h4 className="mb-4 text-sm tracking-tighter mt-7 text-zinc-400 md:mb-6">
            Navigation
          </h4>
          <nav className="flex flex-col gap-8 mb-auto">
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
              navigateTo={"/transaction"}
              title={"Add Transaction"}
              icon={<HiOutlineDocumentAdd className="w-5 h-5 ml-2 mr-1" />}
            />
            <NavItem
              navigateTo={"/reports"}
              title={"Reports"}
              icon={<TbReportAnalytics className="w-5 h-5 ml-2 mr-1" />}
            />
          </nav>
          <footer className="p-2 mx-auto my-2 border w-max rounded-xl border-zinc-300">
            <div className="mb-2 text-sm font-bold font-roboto">
              {!authData?.authUser?.username ? (
                <Skeleton className="h-full min-w-18" />
              ) : (
                (authData?.authUser?.name || "").toUpperCase()
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
        <div className="text-zinc absolute z-50 flex h-screen -translate-x-full flex-col justify-start bg-zinc-900 bg-[url('/navBg.svg')] bg-[auto_70%] bg-bottom bg-no-repeat px-7 transition-transform xl:static xl:translate-0">
          <div className="relative flex items-center justify-start w-full h-20 gap-2">
            <div
              onClick={() => sidebarSetter(sidebarStatus ? false : true)}
              className={`absolute top-11.5 -right-14 cursor-pointer rounded-full border bg-red-600 p-0.5 transition-all duration-500 ease-in-out md:-right-18 md:p-2 xl:top-auto xl:-right-12 ${sidebarStatus && "rotate-y-180"} `}
            >
              <TiChevronRightOutline className="w-5 h-5 rounded-full" />
            </div>
            <NavLink className="" to="/">
              <img className="h-12" src="/logo.svg" alt="" />
            </NavLink>
          </div>
          <h4 className="mb-6 ml-3 tracking-tighter mt-7 text-zinc-400">Nav</h4>
          <nav className="flex flex-col gap-8 mb-auto">
            <div className="tooltip tooltip-right">
              <div className="tooltip-content shadow-main bg-zinc-800">
                <div className="text-base font-black text-orange-400">
                  Overview
                </div>
              </div>

              <NavItem
                navigateTo={"/"}
                title={""}
                icon={<BiPieChart className="ml-2 mr-1 h-7 w-7" />}
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
                icon={<GrTransaction className="ml-2 mr-1 h-7 w-7" />}
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
                icon={<HiOutlineDocumentAdd className="ml-2 mr-1 h-7 w-7" />}
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
                icon={<TbReportAnalytics className="ml-2 mr-1 h-7 w-7" />}
              />
            </div>
          </nav>
          <footer className="p-2 mx-auto my-2 border w-max rounded-xl border-zinc-300">
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
              <div className="tooltip tooltip-right">
                <div className="tooltip-content shadow-main bg-zinc-800">
                  <div className="text-base font-black text-orange-400">
                    Logout
                  </div>
                </div>
                <div className="p-1 bg-red-500 rounded-lg cursor-pointer">
                  <TbPower
                    className="w-6 h-6 cursor-pointer"
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
