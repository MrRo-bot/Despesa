import { motion } from "motion/react";
import { TbLock, TbUserHeart } from "react-icons/tb";

import InputField from "../InputField";

const SignIn = ({
  //@ts-expect-error: function
  handleSubmitLogin,
  //@ts-expect-error: function
  handleLoginChange,
  //@ts-expect-error: object containing username and password
  loginData,
  //@ts-expect-error: boolean
  loginLoading,
}) => {
  return (
    <div className="absolute top-0 left-0 flex h-full w-full flex-col justify-start rounded-md bg-[#170b35] bg-[url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg')] bg-[auto_100%] bg-bottom bg-no-repeat backface-hidden transform-3d">
      <div className="absolute left-0 z-20 block w-full translate-x-0 translate-y-1/2 translate-z-9 px-9 perspective-dramatic">
        <div className="w-full text-center">
          <form className="" onSubmit={handleSubmitLogin}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.7,
              }}
              className="relative mx-auto flex max-w-max items-center justify-center"
            >
              <TbUserHeart className="absolute left-3 h-7 w-7 text-[#ffeba7]" />
              <InputField
                customStyle={{ paddingLeft: 50 + "px" }}
                label=""
                id="username"
                name="username"
                type=""
                placeHolder="Your Username"
                value={loginData.username}
                onChange={handleLoginChange}
                isRequired={false}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.8,
              }}
              className="relative mx-auto mt-2 flex max-w-max items-center justify-center"
            >
              <TbLock className="absolute left-3 h-7 w-7 text-[#ffeba7]" />
              <InputField
                customStyle={{ paddingLeft: 50 + "px" }}
                label=""
                id="password"
                name="password"
                type={"password"}
                placeHolder="Your Password"
                value={loginData.password}
                onChange={handleLoginChange}
                isRequired={false}
              />
            </motion.div>
            <button
              disabled={loginLoading}
              className="font-roboto mt-10 inline-flex h-11 cursor-pointer items-center justify-center rounded-sm border-none bg-[#ffeba7] px-8 text-center text-sm font-semibold tracking-widest text-[#102770] uppercase shadow-[0_8px_24px_0_rgba(255,255,167,.2)] transition-all duration-200 ease-linear hover:bg-[#102770] hover:text-[#ffeba7] hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] focus:bg-[#102770] focus:text-[#ffeba7] focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] active:bg-[#102770] active:text-[#ffeba7] active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] disabled:cursor-none disabled:bg-[rgba(255,255,167,.2)] disabled:text-zinc-50"
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
