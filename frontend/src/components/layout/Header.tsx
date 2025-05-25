import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { NumericFormat } from "react-number-format";

const Header = ({ total }: { total: number }) => {
  const location = useLocation();

  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-b-zinc-800/40 px-10">
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -400, scale: 0.5 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="font-roboto bg-gradient-to-r from-pink-800 via-indigo-800 to-pink-800 bg-clip-text px-2 text-3xl font-black tracking-tighter text-transparent"
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
        className="font-roboto shadow-main flex items-center justify-between gap-3 border border-zinc-700 p-2 tracking-wider text-zinc-700"
      >
        <span className="text-md font-extrabold tracking-tighter">
          My Balance
        </span>

        <span className="flex items-center gap-2 text-2xl font-black text-pink-700">
          <NumericFormat
            value={total}
            thousandSeparator
            thousandsGroupStyle="lakh"
            displayType="text"
            className="w-max text-xl font-extrabold text-pink-700"
          />
          ₹
        </span>
      </motion.div>
    </header>
  );
};

export default Header;
