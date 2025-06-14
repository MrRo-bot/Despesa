import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMutation } from "@apollo/client";

import { LOGIN, SIGN_UP } from "../graphql/mutations/user.mutation";

import customToastFunction from "../utils/Toastify";

import LoginHeader from "../components/authentication/LoginHeader";
import SignUp from "../components/authentication/SignUp";
import SignIn from "../components/authentication/SignIn";

import { SignInType, SignUpType } from "../types/types";

const Authentication = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [isToggle, setIsToggle] = useState<boolean>(false);

  const [loginData, setLoginData] = useState<SignInType>({
    username: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState<SignUpType>({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  const [signup, { loading: signUpLoading }] = useMutation(SIGN_UP, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const [login, { loading: loginLoading }] = useMutation(LOGIN, {
    refetchQueries: ["GetAuthenticatedUser"],
  });

  const handleSubmitSignUp = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await signup({
        variables: {
          input: signUpData,
        },
      });

      customToastFunction(
        `WELCOME! 🥳 ${signUpData?.name}`,
        "top-center",
        "light",
        "",
      );
    } catch (error) {
      customToastFunction(`${error}`, "top-center", "colored", "error");
    }
  };

  const handleSubmitLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await login({
        variables: {
          input: loginData,
        },
      });

      customToastFunction(
        `WELCOME! 🥳 ${loginData?.username}`,
        "top-center",
        "light",
        "",
      );
    } catch (error) {
      customToastFunction(`${error}`, "top-center", "colored", "error");
    }
  };

  const handleCheck = (e: { target: { checked: boolean } }) => {
    return e.target.checked ? setToggle(true) : setToggle(false);
  };

  const handleSignUpChange = (e: {
    target: { name: string; value: string; type: string };
  }) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setSignUpData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleLoginChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="relative h-screen">
      <LoginHeader />
      <main className="relative flex flex-col items-center gap-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
          }}
          className="rounded-full bg-zinc-50/50 px-3 py-1"
        >
          <p className="relative z-50 flex gap-6 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 bg-clip-text text-xl font-bold text-transparent md:text-2xl xl:text-3xl">
            <span>SignIn</span>
            <span>SignUp</span>
          </p>
        </motion.div>
        <motion.label
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
          }}
          htmlFor="switch"
          className={`relative mt-4 h-3 w-16 cursor-pointer rounded-full bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 before:absolute before:-top-[9px] before:z-10 before:h-8 before:w-8 before:rounded-full before:bg-blue-800 before:text-center before:text-lg before:transition-all before:duration-500 before:content-["⇖"] has-checked:before:translate-x-10 has-checked:before:rotate-[-270deg] md:mt-6`}
        >
          <input
            onChange={handleCheck}
            className="sr-only"
            type="checkbox"
            name="switch"
            id="switch"
          />
        </motion.label>
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
          }}
          className="relative my-10 h-[45vh] min-h-96 w-1/4 min-w-80 perspective-[800px] transform-3d sm:my-5"
        >
          <div className="font-roboto absolute -bottom-7 left-1/2 flex w-max -translate-x-1/2 cursor-pointer items-center justify-between gap-2 rounded-md bg-[#170b35b4] px-2 py-0.5 text-sm md:-bottom-8 md:text-base">
            Secured by
            <img
              className="h-4 w-4"
              src="https://www.passportjs.org/images/logo.svg"
              alt="P"
            />
          </div>

          <div
            className={`absolute top-0 left-0 h-full w-full transition-all duration-700 ease-out transform-3d ${toggle && "rotate-y-180"}`}
          >
            <SignIn
              handleSubmitLogin={handleSubmitLogin}
              handleLoginChange={handleLoginChange}
              loginData={loginData}
              loginLoading={loginLoading}
            />
            <SignUp
              handleSubmitSignUp={handleSubmitSignUp}
              handleSignUpChange={handleSignUpChange}
              signUpData={signUpData}
              signUpLoading={signUpLoading}
            />
          </div>
        </motion.section>
      </main>
      <div onClick={() => setIsToggle(!isToggle)}>
        <div className="font-roboto absolute bottom-1 left-1/2 -translate-x-1/2 cursor-pointer bg-[#170b3535] px-1 select-none">
          hints
        </div>
      </div>
      <AnimatePresence>
        {isToggle && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="shadow-main absolute bottom-9 left-1/2 max-w-10/12 -translate-x-1/2 rounded-md bg-zinc-800"
          >
            <pre className="flex flex-col gap-1 p-1 text-left text-xs xl:text-sm">
              <div>
                <strong className="text-orange-500">USERNAME: </strong>
                <p className="text-wrap text-fuchsia-400">
                  Input must start and end with alphanumeric characters, cannot
                  have consecutive special characters, and can only contain
                  alphanumeric characters, underscores, and hyphens.
                </p>
              </div>
              <div>
                <strong className="text-orange-500">PASSWORD: </strong>
                <span className="text-indigo-400">eg. MyP@ssw0rd1</span>
              </div>
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Authentication;
