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

const Chart = () => {
  const data = [
    {
      Month: "Jan",
      Balance: 100,
    },
    {
      Month: "Feb",
      Balance: 3000,
    },
    {
      Month: "Mar",
      Balance: 2000,
    },
    {
      Month: "Apr",
      Balance: 2780,
    },
    {
      Month: "May",
      Balance: 1890,
    },
    {
      Month: "Jun",
      Balance: 2390,
    },
    {
      Month: "Jul",
      Balance: 3490,
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.2,
      }}
      className="shadow-main h-[30vh] w-[90%] bg-zinc-50"
    >
      <h3 className="font-roboto mt-4 mb-3 ml-5 text-2xl text-zinc-900">
        Balance History
      </h3>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className={"shadow-main bg-zinc-50"}
      >
        <AreaChart
          width={730}
          height={250}
          data={data}
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
    </motion.div>
  );
};

export default Chart;
