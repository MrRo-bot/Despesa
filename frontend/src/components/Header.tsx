import { Link } from "react-router-dom";
import * as motion from "motion/react-client";

import { MdLogout } from "react-icons/md";
import { useMutation, useQuery } from "@apollo/client";
import { LOGOUT } from "../graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";

const Header = () => {
  const [logout] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const { data, loading: accLoading } = useQuery(GET_AUTHENTICATED_USER);

  const handleLogout = async () => {
    try {
      await logout(); //logout and clears cache as well
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const glowAnim = {
    x: [0 + "%", 75 + "%", -75 + "%", 0 + "%"],
  };

  const glowTran = {
    duration: 20,
    ease: "easeInOut",
    times: [0, 0.3, 0.7, 1],
    repeat: Infinity,
    repeatDelay: 1,
  };

  return (
    <>
      <div className="mb-10">
        <div className="flex gap-2 justify-around items-center">
          <Link to="/">
            <img
              referrerPolicy="no-referrer"
              className="max-h-24"
              src="/logo.png"
              alt=""
            />
          </Link>
          <Link className="flex items-center" to="/">
            <h1 className="font-heading md:text-5xl text-4xl lg:text-7xl font-bold text-center relative z-50 text-white">
              Despesa
            </h1>
            <span className=" h-8 aspect-square overflow-clip text-center">
              <div className="animate-currency flex flex-col">
                <motion.pre className="text-2xl inline">$</motion.pre>
                <motion.pre className="text-2xl inline">₣</motion.pre>
                <motion.pre className="text-2xl inline">₩</motion.pre>
                <motion.pre className="text-2xl inline">€</motion.pre>
                <motion.pre className="text-2xl inline">₱</motion.pre>
                <motion.pre className="text-2xl inline">₹</motion.pre>
                <motion.pre className="text-2xl inline">₽</motion.pre>
                <motion.pre className="text-2xl inline">₿</motion.pre>
              </div>
            </span>
          </Link>
          <div>
            {data?.authUser && (
              <div className="flex gap-2 items-center">
                <img
                  src={data?.authUser?.profilePicture}
                  className="w-11 h-11 grid place-items-center rounded-full border cursor-pointer"
                  alt="U"
                />
                {!accLoading && (
                  <MdLogout
                    className="mx-2 w-5 h-5 cursor-pointer"
                    onClick={handleLogout}
                  />
                )}
                {/* Loading spinner */}
                {accLoading && (
                  <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="relative mb-10 w-1/2 mx-auto hidden md:block">
          {/* Gradients */}
          <motion.div
            animate={glowAnim}
            transition={glowTran}
            className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm"
          />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <motion.div
            animate={glowAnim}
            transition={glowTran}
            className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-[5px] w-1/4 blur-sm"
          />
          <motion.div
            animate={glowAnim}
            transition={glowTran}
            className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-1/4"
          />
        </div>
      </div>
    </>
  );
};

export default Header;
