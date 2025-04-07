import { TbChartPie, TbMoneybag } from "react-icons/tb";
import { motion } from "motion/react";
import { NumericFormat } from "react-number-format";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

const Balances = () => {
  return (
    // <SkeletonTheme
    //   baseColor="rgba(255,255,255,0.1)"
    //   customHighlightBackground="linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255, 127, 144,0.25)15%, rgba(196, 153, 252,0.35)40%, rgba(255, 139, 152,0.45) 60%, rgba(255, 222, 148,0.25)85%, rgba(255,255,255,0.1) 100%)"
    // >
    <div className="mr-auto flex w-[90%] items-center gap-8">
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
          {/* <Skeleton style={{ width: 8 + "em", height: 1.5 + "em" }} /> */}
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
          {/* <Skeleton style={{ width: 8 + "em", height: 1.5 + "em" }} /> */}
        </div>
      </motion.div>
    </div>

    //  </SkeletonTheme>
  );
};

export default Balances;
