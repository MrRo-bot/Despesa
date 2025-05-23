import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import FullPageLoading from "../components/layout/FullPageLoading";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { BalancesType } from "../types/types";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
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
    }, 500);

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
        <div className="flex w-screen no-scrollbar justify-stretch">
          <Sidebar
            sidebarStatus={isSidebarOpen}
            sidebarSetter={setIsSidebarOpen}
          />
          <main className="w-full h-screen overflow-y-scroll">
            <Header
              //@ts-expect-error: not recognizing number even though ive defined types and value is not string
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
