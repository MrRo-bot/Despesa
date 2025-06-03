import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

import Header from "../components/layout/Header";
// import Sidebar from "../components/layout/Sidebar";
import FullPageLoading from "../components/layout/FullPageLoading";

import { BalancesType } from "../types/types";

const Layout = () => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  const location = useLocation();

  const [balance, setBalance] = useState<BalancesType>({
    income: 0,
    expense: 0,
    saving: 0,
    investment: 0,
  });

  const { data: transaction } = useQuery(GET_TRANSACTIONS);

  useEffect(() => {
    (() => {
      const finalBalance = transaction?.transactions?.reduce(
        (bal: BalancesType, current: { account: string; amount: number }) => {
          if (current.account === "Income") bal.income += current.amount;
          if (current.account === "Expense") bal.expense += current.amount;
          if (current.account === "Investment")
            bal.investment += current.amount;
          if (current.account === "Saving") bal.saving += current.amount;

          return bal;
        },
        { income: 0, expense: 0, saving: 0, investment: 0 },
      );
      setBalance(finalBalance);
    })();
  }, [transaction?.transactions]);

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
        <div className="no-scrollbar flex w-screen justify-stretch">
          {/* <Sidebar
            sidebarStatus={isSidebarOpen}
            sidebarSetter={setIsSidebarOpen}
          /> */}
          <main className="h-screen w-full overflow-y-scroll">
            <Header
              total={(
                balance?.income +
                balance?.saving -
                (balance?.expense + balance?.investment)
              ).toFixed(2)}
            />
            <Outlet context={balance} />
          </main>
        </div>
      )}
    </>
  );
};

export default Layout;
