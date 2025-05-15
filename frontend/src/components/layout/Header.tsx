import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { NumericFormat } from "react-number-format";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Header = ({ total }: { total: number }) => {
  const location = useLocation();

  return (
    <SkeletonTheme
      duration={1}
      baseColor="rgba(220,220,220,0.2)"
      customHighlightBackground="linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255, 127, 144,0.25)15%, rgba(196, 153, 252,0.35)40%, rgba(255, 139, 152,0.45) 60%, rgba(255, 222, 148,0.25)85%, rgba(255,255,255,0.1) 100%)"
    >
      <header className="flex items-center justify-between w-full h-20 px-10 border-b border-b-zinc-800/40">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -400, scale: 0.5 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-3xl font-black tracking-tighter font-roboto text-zinc-900"
          >
            {location.pathname.slice(1, 2).toUpperCase() +
              location.pathname.slice(2) ||
              (location.pathname === "/" && "Overview")}
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 400, scale: 0.5 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex items-center justify-between gap-3 p-2 tracking-wider border font-roboto shadow-main border-zinc-700 text-zinc-500"
        >
          <span className="font-extrabold tracking-tighter text-md">
            My Balance
          </span>
          {total > 0 ? (
            <span className="flex items-center gap-2 text-2xl font-black text-pink-700">
              <NumericFormat
                value={total}
                thousandSeparator
                thousandsGroupStyle="lakh"
                displayType="text"
                className="text-xl font-extrabold text-pink-700 w-max"
              />
              ₹
            </span>
          ) : (
            <Skeleton className="h-full min-w-18" />
          )}
        </motion.div>
      </header>
    </SkeletonTheme>
  );
};

export default Header;
