import Balances from "../components/overview/Balances";
import Chart from "../components/overview/Chart";
import Investments from "../components/overview/Investments";
import RecentTransactions from "../components/overview/RecentTransactions";

const Overview = () => {
  return (
    <div className="mx-auto flex w-full justify-between gap-14 px-10 pt-4 pb-2">
      <div className="flex w-[65%] flex-col items-stretch gap-7">
        <Balances />
        <Chart />
        <Investments />
      </div>
      <div className="w-[35%]">
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Overview;
