import { useOutletContext } from "react-router-dom";

import Balances from "../components/overview/Balances";
import Chart from "../components/overview/Chart";
import Investments from "../components/overview/Investments";
import RecentTransactions from "../components/overview/RecentTransactions";

import { BalancesType } from "../types/types";

const Overview = () => {
  const balance = useOutletContext<BalancesType>();

  return (
    <div className="mx-auto flex w-full flex-col px-3 py-4 sm:px-6 md:px-10 lg:flex-row lg:justify-between lg:gap-10 lg:pt-4 lg:pb-2">
      <div className="flex flex-col items-stretch gap-4 lg:w-[65%] lg:gap-5">
        <Balances balance={balance} />
        <Chart />
        <Investments />
      </div>
      <div className="mt-5 lg:mt-0 lg:w-[35%]">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Overview;
