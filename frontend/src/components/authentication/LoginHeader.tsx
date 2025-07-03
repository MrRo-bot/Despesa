import { Link } from "react-router-dom";
import { motion } from "motion/react";

const LoginHeader = () => {
  return (
    <>
      <div className="py-2 mb-5 sm:mb-10">
        <Link className="flex items-center justify-center gap-1" to="/">
          <motion.img
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.1,
            }}
            className="h-9"
            src="/logo.svg"
            alt=""
          />
          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
            }}
            className="relative z-50 text-4xl font-bold text-center text-transparent font-roboto bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 bg-clip-text leading-16 md:text-5xl xl:text-6xl"
          >
            Despesa
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
            }}
            className="self-start w-5 text-center aspect-square h-7 overflow-clip"
          >
            <div className="animate-currency flex flex-col px-0.5 tracking-tighter">
              <motion.pre className="inline text-2xl">$</motion.pre>
              <motion.pre className="inline text-2xl">€</motion.pre>
              <motion.pre className="inline text-2xl">₹</motion.pre>
              <motion.pre className="inline text-2xl">¥</motion.pre>
              <motion.pre className="inline text-2xl">£</motion.pre>
            </div>
          </motion.span>
        </Link>
      </div>
    </>
  );
};

export default LoginHeader;
