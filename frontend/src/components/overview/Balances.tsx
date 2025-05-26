import { TbChartPie, TbMoneybag, TbPlus } from "react-icons/tb";
import { motion } from "motion/react";
import { NumericFormat } from "react-number-format";
import { NavLink } from "react-router-dom";
import { BalancesType } from "../../types/types";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect, useState } from "react";

const Balances = ({ balance }: { balance: BalancesType }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      setLoading(false);
      clearTimeout(timeout);
    };
  }, [balance]);

  return (
    <SkeletonTheme
      duration={1}
      baseColor="rgba(220,220,220,0.2)"
      customHighlightBackground="linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255, 127, 144,0.25)15%, rgba(196, 153, 252,0.35)40%, rgba(255, 139, 152,0.45) 60%, rgba(255, 222, 148,0.25)85%, rgba(255,255,255,0.1) 100%)"
    >
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
            <h5 className="text-lg tracking-tight">Total Savings</h5>

            {balance?.saving > 0 && !loading ? (
              <span className="flex gap-1 text-3xl">
                <NumericFormat
                  value={balance?.saving}
                  thousandSeparator
                  thousandsGroupStyle="lakh"
                  displayType="text"
                />
                ₹
              </span>
            ) : loading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              balance?.saving === 0 && !loading && "..."
            )}
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

            {balance?.investment > 0 && !loading ? (
              <span className="flex gap-1 text-3xl">
                <NumericFormat
                  value={balance?.investment}
                  thousandSeparator
                  thousandsGroupStyle="lakh"
                  displayType="text"
                />
                ₹
              </span>
            ) : loading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              balance?.saving === 0 && !loading && "..."
            )}
          </div>
        </motion.div>
        <NavLink to="/transaction">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.4,
            }}
            className="flex items-center justify-center gap-3 rounded-full bg-zinc-900 px-6 py-4"
          >
            <div className="grid min-h-18 min-w-18 place-items-center rounded-full bg-zinc-50">
              <TbPlus className="h-8 w-8 text-zinc-900" size={18} />
            </div>
            <div className="flex flex-col gap-1 text-zinc-50">
              <h5 className="text-xl tracking-tight">
                Add a
                <br />
                Transaction
              </h5>
            </div>
          </motion.div>
        </NavLink>
      </div>
    </SkeletonTheme>
  );
};

export default Balances;
