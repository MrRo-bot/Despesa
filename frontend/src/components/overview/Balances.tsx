import { TbChartPie, TbMoneybag, TbPlus } from "react-icons/tb";
import { motion } from "motion/react";
import { NumericFormat } from "react-number-format";
import { NavLink } from "react-router-dom";

const Balances = () => {
  return (
    <div className="flex items-center gap-8">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0,
        }}
        className="flex items-center justify-center gap-3 rounded-full bg-zinc-50 px-6 py-4"
      >
        <div className="grid min-h-18 min-w-18 place-items-center rounded-full bg-zinc-900">
          <TbMoneybag className="h-8 w-8 text-zinc-50" />
        </div>
        <div className="flex flex-col gap-1 text-zinc-900">
          <h5 className="text-lg tracking-tight">Spending in Jul</h5>
          <NumericFormat
            value={1250}
            thousandSeparator
            thousandsGroupStyle="lakh"
            displayType="text"
            className="text-3xl"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.2,
        }}
        className="flex items-center justify-center gap-3 rounded-full bg-zinc-900 px-6 py-4"
      >
        <div className="grid min-h-18 min-w-18 place-items-center rounded-full bg-zinc-50">
          <TbChartPie className="h-8 w-8 text-zinc-900" />
        </div>
        <div className="flex flex-col gap-1 text-zinc-50">
          <h5 className="text-lg tracking-tight">Total Investment</h5>
          <NumericFormat
            value={1250}
            thousandSeparator
            thousandsGroupStyle="lakh"
            displayType="text"
            className="text-3xl"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.4,
        }}
        className="w-max rounded-full bg-zinc-900 p-2 text-zinc-50"
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <NavLink to="/transaction">
            <div className="grid aspect-square place-items-center rounded-full border-3 border-dotted border-zinc-50 p-1">
              <TbPlus size={18} />
            </div>
            <div className="font-roboto text-lg">
              Add
              <br />
              TXN
            </div>
          </NavLink>
        </div>
      </motion.div>
    </div>
  );
};

export default Balances;
