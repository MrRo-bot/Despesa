import { Link } from "react-router-dom";
import { motion } from "motion/react";

const LoginHeader = () => {
  return (
    <>
      <div className="mb-10 py-2">
        <Link className="flex items-center justify-center" to="/">
          <motion.img
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.1,
            }}
            className="mt-2 mr-1 h-9"
            src="/logo.svg"
            alt=""
          />
          <motion.h1
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
            }}
            className="font-roboto relative z-50 text-center text-2xl leading-16 font-bold text-zinc-50 md:text-5xl"
          >
            Despesa
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
            }}
            className="aspect-square h-7 w-5 self-start overflow-clip text-center"
          >
            <div className="animate-currency flex flex-col">
              <motion.pre className="inline text-2xl">$</motion.pre>
              <motion.pre className="inline text-2xl">₣</motion.pre>
              <motion.pre className="inline text-2xl">₩</motion.pre>
              <motion.pre className="inline text-2xl">€</motion.pre>
              <motion.pre className="inline text-2xl">₱</motion.pre>
              <motion.pre className="inline text-2xl">₹</motion.pre>
              <motion.pre className="inline text-2xl">₽</motion.pre>
              <motion.pre className="inline text-2xl">₿</motion.pre>
            </div>
          </motion.span>
        </Link>
      </div>
    </>
  );
};

export default LoginHeader;
