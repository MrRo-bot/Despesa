import { ChangeEventHandler, FormEventHandler } from "react";
import { motion } from "motion/react";

import { TbLock, TbUserHeart } from "react-icons/tb";

const SignIn = ({
  handleSubmitLogin,
  handleLoginChange,
  loginData,
  loginLoading,
}: {
  handleSubmitLogin: FormEventHandler<HTMLFormElement>;
  handleLoginChange: ChangeEventHandler<HTMLInputElement>;
  loginData: {
    username: string;
    password: string;
  };
  loginLoading: boolean;
}) => {
  return (
    <div className="absolute top-0 left-0 flex h-full w-full flex-col justify-start rounded-md bg-[#170b35] bg-[url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg')] bg-[auto_100%] bg-bottom bg-no-repeat backface-hidden transform-3d">
      <div className="absolute left-0 z-20 block w-full translate-x-0 translate-y-1/2 translate-z-9 px-9 perspective-dramatic">
        <div className="w-full text-center">
          <form className="mx-auto max-w-max" onSubmit={handleSubmitLogin}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.7,
              }}
              className="relative flex items-center justify-center"
            >
              <TbUserHeart className="absolute left-3 h-7 w-7 text-[#ffeba7]" />
              <input
                className="mt-1 w-full rounded-sm bg-[#110828] px-5 py-3.5 pl-[50px] text-lg leading-6 font-medium tracking-wider transition-all duration-200 ease-linear outline-none valid:shadow-[0_2px_8px_1px_rgb(39,150,92)] invalid:shadow-[0_2px_8px_1px_rgb(200,19,92)]"
                id="username"
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleLoginChange}
                placeholder="Your Username"
                pattern="^(?=.{3,20}$)(?![_.\-])(?!.*[_.\-]{2})[a-zA-Z0-9_\-]+([^._-])$"
                autoComplete="on"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.8,
              }}
              className="relative mt-2 flex items-center justify-center"
            >
              <TbLock className="absolute left-3 h-7 w-7 text-[#ffeba7]" />

              <input
                className="mt-1 w-full rounded-sm bg-[#110828] px-5 py-3.5 pl-[50px] text-lg leading-6 font-medium tracking-wider transition-all duration-200 ease-linear outline-none valid:shadow-[0_2px_8px_1px_rgb(39,150,92)] invalid:shadow-[0_2px_8px_1px_rgb(200,19,92)]"
                id="password"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Your Password"
                pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
                autoComplete="off"
                required
              />
            </motion.div>

            <button
              disabled={loginLoading}
              className="font-roboto mx-auto mt-10 inline-flex h-11 w-max cursor-pointer items-center justify-center rounded-sm border-none bg-[#ffeba7] px-8 text-center text-sm font-semibold tracking-widest text-[#102770] uppercase shadow-[0_8px_24px_0_rgba(255,255,167,.2)] transition-all duration-200 ease-linear hover:bg-[#102770] hover:text-[#ffeba7] hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] focus:bg-[#102770] focus:text-[#ffeba7] focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] active:bg-[#102770] active:text-[#ffeba7] active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] disabled:cursor-none disabled:bg-[rgba(255,255,167,.2)] disabled:text-zinc-50"
            >
              {loginLoading ? "loading..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
