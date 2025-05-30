import { useQuery } from "@apollo/client";
import { motion } from "motion/react";

import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

import DoughnutComponent from "../components/reports/DoughnutComponent";
import BarComponent from "../components/reports/BarComponent";
import PieComponent from "../components/reports/PieComponent";
import LineComponent from "../components/reports/LineComponent";
import PolarAreaComponent from "../components/reports/PolarAreaComponent";

const Reports = () => {
  const { data: transaction } = useQuery(GET_TRANSACTIONS);

  return (
    <div className="h-[90vh] w-full p-5">
      <div className="grid h-full grid-cols-[2fr_1fr_1fr_1fr] grid-rows-[1.25fr_1fr] gap-3">
        {/* doughnut chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative col-start-1 col-end-2 row-start-1 row-end-2 flex h-full w-full items-center justify-center rounded-xl bg-zinc-50/90 shadow-sm shadow-zinc-50/70"
        >
          <DoughnutComponent transaction={transaction} />
        </motion.div>

        {/* bar chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative col-start-2 col-end-5 row-start-1 row-end-2 flex h-full w-full items-center justify-center rounded-xl bg-zinc-50/90 shadow-sm shadow-zinc-50/70"
        >
          <BarComponent transaction={transaction} />
        </motion.div>

        {/* pie chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative col-start-1 col-end-2 row-start-2 row-end-3 flex h-full w-full items-center justify-center rounded-xl bg-zinc-50/90 shadow-sm shadow-zinc-50/70"
        >
          <PieComponent transaction={transaction} />
        </motion.div>

        {/* polarArea chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative col-start-2 col-end-3 row-start-2 row-end-3 flex h-full w-full items-center justify-center rounded-xl bg-zinc-50/90 shadow-sm shadow-zinc-50/70"
        >
          <PolarAreaComponent transaction={transaction} type="account" />
        </motion.div>
        {/* line chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative col-start-3 col-end-4 row-start-2 row-end-3 flex h-full w-full items-center justify-center rounded-xl bg-zinc-50/90 shadow-sm shadow-zinc-50/70"
        >
          <LineComponent transaction={transaction} />
        </motion.div>
        {/* polarArea chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative col-start-4 col-end-5 row-start-2 row-end-3 flex h-full w-full items-center justify-center rounded-xl bg-zinc-50/90 shadow-sm shadow-zinc-50/70"
        >
          <PolarAreaComponent transaction={transaction} type="paymentType" />
        </motion.div>
      </div>
    </div>
  );
};
export default Reports;
