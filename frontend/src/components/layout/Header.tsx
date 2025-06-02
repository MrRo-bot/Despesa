import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { NumericFormat } from "react-number-format";

const Header = ({ total }: { total: string }) => {
  const location = useLocation();

  return (
    <header className="flex h-15 w-full items-center justify-between border-b border-b-zinc-800/40 px-3 sm:px-6 md:h-17 md:px-10 lg:h-20">
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -400, scale: 0.5 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="font-roboto bg-gradient-to-r from-pink-800 via-indigo-800 to-pink-800 bg-clip-text px-2 text-xl font-black tracking-tighter text-transparent sm:text-2xl md:text-3xl"
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
        className="font-roboto shadow-main flex items-center justify-between gap-2 border border-zinc-700 p-1 tracking-wider text-zinc-700 md:gap-3 md:p-2"
      >
        <span className="font-extrabold tracking-tighter">My Balance</span>

        <span className="flex items-center gap-2 font-black text-pink-700 sm:text-xl md:text-2xl">
          <NumericFormat
            value={total}
            thousandSeparator
            thousandsGroupStyle="lakh"
            displayType="text"
            className="w-max"
          />
          ₹
        </span>
      </motion.div>
    </header>
  );
};

export default Header;
