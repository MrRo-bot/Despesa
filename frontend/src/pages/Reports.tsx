import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { motion } from "motion/react";

import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

import DoughnutComponent from "../components/reports/DoughnutComponent";
import BarComponent from "../components/reports/BarComponent";
import PieComponent from "../components/reports/PieComponent";
import LineComponent from "../components/reports/LineComponent";
import PolarAreaComponent from "../components/reports/PolarAreaComponent";
import { BalancesType } from "../types/types";

const Reports = () => {
  const { sidebarStatus, sidebarSetter } = useOutletContext<{
    balance: BalancesType;
    sidebarStatus: boolean;
    sidebarSetter: React.Dispatch<boolean>;
  }>();

  useEffect(() => {
    if (window.innerWidth < 1280 && sidebarStatus) {
      sidebarSetter(!sidebarStatus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: transaction } = useQuery(GET_TRANSACTIONS);

  return (
    <div className="w-full p-5 overflow-scroll">
      <div className="flex h-[50vh] w-full flex-col gap-2 md:h-[40vh] md:flex-row">
        {/* doughnut chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative w-full h-full shadow-sm rounded-xl bg-zinc-50/90 shadow-zinc-50/70"
        >
          <DoughnutComponent transaction={transaction} />
        </motion.div>

        {/* bar chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative w-full h-full shadow-sm rounded-xl bg-zinc-50/90 shadow-zinc-50/70"
        >
          <BarComponent transaction={transaction} />
        </motion.div>
      </div>

      <div className="mt-2 flex h-[50vh] w-full flex-col gap-2 md:h-[40vh] md:flex-row">
        {/* pie chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative w-full h-full shadow-sm rounded-xl bg-zinc-50/90 shadow-zinc-50/70"
        >
          <PieComponent transaction={transaction} />
        </motion.div>

        {/* line chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative w-full h-full shadow-sm rounded-xl bg-zinc-50/90 shadow-zinc-50/70"
        >
          <LineComponent transaction={transaction} />
        </motion.div>
      </div>
      <div className="mt-2 flex h-[50vh] w-full flex-col gap-2 md:h-[40vh] md:flex-row">
        {/* polarArea chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative w-full h-full shadow-sm rounded-xl bg-zinc-50/90 shadow-zinc-50/70"
        >
          <PolarAreaComponent transaction={transaction} type="account" />
        </motion.div>
        {/* polarArea chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative w-full h-full shadow-sm rounded-xl bg-zinc-50/90 shadow-zinc-50/70"
        >
          <PolarAreaComponent transaction={transaction} type="paymentType" />
        </motion.div>
      </div>
    </div>
  );
};
export default Reports;
