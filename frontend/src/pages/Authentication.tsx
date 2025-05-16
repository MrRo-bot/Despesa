import { useState } from "react";

import { useMutation } from "@apollo/client";
import { motion } from "motion/react";

import LoginHeader from "../components/authentication/LoginHeader";
import { LOGIN, SIGN_UP } from "../graphql/mutations/user.mutation";
import customToastFunction from "../utils/Toastify";
import SignUp from "../components/authentication/SignUp";
import SignIn from "../components/authentication/SignIn";

const Authentication = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  const [loginData, setLoginData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState<{
    name: string;
    username: string;
    password: string;
    gender: string;
  }>({
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
    <>
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
          <h2 className="relative z-50 flex gap-6 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 bg-clip-text text-2xl font-black text-transparent">
            <span>SignIn</span>
            <span>SignUp</span>
          </h2>
        </motion.div>
        <motion.label
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
          }}
          htmlFor="switch"
          className={`relative mt-6 h-3 w-16 cursor-pointer rounded-full bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 before:absolute before:-top-[9px] before:z-10 before:h-8 before:w-8 before:rounded-full before:bg-blue-800 before:text-center before:text-lg before:text-zinc-50 before:transition-all before:duration-500 before:content-["⇖"] has-checked:before:translate-x-10 has-checked:before:rotate-[-270deg]`}
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
          className="relative my-5 ml-5 h-[45vh] min-h-96 w-1/4 min-w-80 perspective-[800px] transform-3d"
        >
          <div
            className="tooltip tooltip-left tooltip-secondary"
            data-tip="Passport.js"
          >
            <div className="font-roboto absolute top-[34px] -left-[77px] flex w-32 -rotate-90 cursor-pointer items-center justify-between rounded-md bg-[#170b35b4] px-1">
              Secured by
              <img
                className="h-4 w-4"
                src="https://www.passportjs.org/images/logo.svg"
                alt="P"
              />
            </div>
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
    </>
  );
};

export default Authentication;
