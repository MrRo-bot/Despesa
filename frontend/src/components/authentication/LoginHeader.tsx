import { Link } from "react-router-dom";
import * as motion from "motion/react-client";

const LoginHeader = () => {
  return (
    <>
      <div className="mb-10 py-2">
        <Link className="flex items-center justify-center" to="/">
          <img className="h-16" src="/logo.png" alt="" />
          <h1 className="font-roboto relative z-50 text-center text-2xl font-bold text-zinc-50 md:text-5xl">
            Despesa
          </h1>
          <span className="aspect-square h-8 w-6 self-start overflow-clip text-center">
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
          </span>
        </Link>
      </div>
    </>
  );
};

export default LoginHeader;
