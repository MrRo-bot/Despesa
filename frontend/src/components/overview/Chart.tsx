import {
  AreaChart,
  Area,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/queries/transaction.query";

const Chart = () => {
  const [monthWiseExp, setMonthWiseExp] = useState([]);

  const { data: transaction } = useQuery(GET_TRANSACTIONS);

  useEffect(() => {
    (() => {
      const monthExp = {
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
      };

      // Create a new Date object
      const today = new Date();
      const sevenMonthsAgo = new Date();
      sevenMonthsAgo.setMonth(today.getMonth() - 6); // Set to 6 months ago

      // Format as YYYY-MM
      const startDate = sevenMonthsAgo.toISOString().slice(0, 7);
      const endDate = today.toISOString().slice(0, 7);

      // Filter transactions within the last 6 months
      const lastSixMonthTransactions = transaction?.transactions.filter(
        (item: { date: string | number }) => {
          const date = new Date(+item.date).toISOString().slice(0, 7);
          return date >= startDate && date <= endDate;
        },
      );

      // Sort by date in descending order and Group by month and sum the amounts
      lastSixMonthTransactions
        .sort((a: { date: string }, b: { date: string }) =>
          b.date.localeCompare(a.date),
        )
        .map(
          (item: {
            date: string | number;
            account: string;
            amount: number;
          }) => {
            const date: string = new Intl.DateTimeFormat("en-US", {
              month: "long",
            })
              .format(new Date(+item.date))
              .slice(0, 3);
            const amount: number = item.account === "Expense" ? item.amount : 0;

            // @ts-expect-error: same ol string used as array index error
            return (monthExp[date] += amount);
          },
        );

      for (const mon in monthExp) {
        // @ts-expect-error: same ol string used as array index error
        if (monthExp[mon] > 0)
          // @ts-expect-error: not known as of now
          setMonthWiseExp((prev) => [
            ...prev,
            // @ts-expect-error: same ol string used as array index error
            { Month: mon, Balance: monthExp[mon] },
          ]);
      }
    })();
  }, [transaction?.transactions]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.2,
      }}
      className="shadow-main h-[30vh] w-[90%] bg-zinc-50"
    >
      <h3 className="mt-4 mb-3 ml-5 text-2xl font-roboto text-zinc-900">
        Total of Expenses
      </h3>
      {monthWiseExp ? (
        <ResponsiveContainer
          width="100%"
          height="100%"
          className={"shadow-main bg-zinc-50"}
        >
          <AreaChart
            width={730}
            height={250}
            data={monthWiseExp}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9f9fa9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#9f9fa9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Label value="Balance History" offset={10} position="top" />
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="Month" />
            <YAxis dataKey="Balance" />
            <Tooltip labelClassName="text-slate-600 font-roboto font-medium" />

            <Area
              type="monotone"
              dataKey="Balance"
              stroke="#52525b"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div>Either haven't calculated data or data not available</div>
      )}
    </motion.div>
  );
};

export default Chart;
