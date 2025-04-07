import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { NumericFormat } from "react-number-format";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import { TbChevronDown } from "react-icons/tb";

const Header = () => {
  const location = useLocation();

  return (
    // <SkeletonTheme
    //   baseColor="rgba(255,255,255,0.1)"
    //   customHighlightBackground="linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255, 127, 144,0.25)15%, rgba(196, 153, 252,0.35)40%, rgba(255, 139, 152,0.45) 60%, rgba(255, 222, 148,0.25)85%, rgba(255,255,255,0.1) 100%)"
    // >
    <header className="flex h-18 w-full items-center justify-between border-b border-b-zinc-800/40 px-10">
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -400, scale: 0.5 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="font-roboto text-3xl font-black tracking-tighter text-zinc-900"
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
        className="font-roboto shadow-main flex items-center justify-between gap-2 border border-zinc-700 p-2 tracking-wider text-zinc-500"
      >
        <span className="text-sm font-extrabold tracking-tighter">
          My Balance
        </span>

        <NumericFormat
          value={120000}
          thousandSeparator
          thousandsGroupStyle="lakh"
          displayType="text"
          className="w-max text-xl font-extrabold text-pink-700"
        />
        {/* <Skeleton style={{ width: 8 + "em" }} /> */}
        <span className="flex cursor-pointer items-center gap-2 text-lg font-black text-pink-700">
          - INR <TbChevronDown className="h-4" />
        </span>
      </motion.div>
    </header>
    // </SkeletonTheme>
  );
};

export default Header;
