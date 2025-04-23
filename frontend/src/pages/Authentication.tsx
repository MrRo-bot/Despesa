import { useState } from "react";
import InputField from "../components/InputField";
import {
  TbGenderFemale,
  TbGenderMale,
  TbLock,
  TbPassword,
  TbUser,
  TbUserHeart,
} from "react-icons/tb";
import { SiNamemc } from "react-icons/si";
import { useMutation } from "@apollo/client";
import { Bounce, toast } from "react-toastify";
import { motion } from "motion/react";

import RadioButton from "../components/RadioButton";
import LoginHeader from "../components/authentication/LoginHeader";
import { LOGIN, SIGN_UP } from "../graphql/mutations/user.mutation";

const Authentication = () => {
  const [toggle, setToggle] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
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

      toast(`WELCOME! 🥳 ${signUpData?.name}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "font-bold",
      });
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
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

      toast(`WELCOME! 🥳 ${loginData?.username}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "font-bold",
      });
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
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
            <div className="absolute top-0 left-0 flex h-full w-full rotate-y-180 flex-col justify-start rounded-md bg-[#170b35] bg-[url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg')] bg-[auto_100%] bg-bottom bg-no-repeat backface-hidden transform-3d">
              <div className="absolute left-0 z-20 block w-full translate-x-0 translate-y-1/10 translate-z-9 px-9 perspective-dramatic">
                <div className="w-full text-center">
                  <form className="" onSubmit={handleSubmitSignUp}>
                    <div className="relative mx-auto mt-2 flex max-w-max items-center justify-center">
                      <SiNamemc className="absolute left-3 h-7 w-7 text-[#ffeba7]" />
                      <InputField
                        customStyle={{ paddingLeft: 50 + "px" }}
                        label=""
                        id="name"
                        name="name"
                        type=""
                        placeHolder="Full name"
                        value={signUpData.name}
                        onChange={handleSignUpChange}
                        isRequired={false}
                      />
                    </div>

                    <div className="relative mx-auto mt-2 flex max-w-max items-center justify-center">
                      <TbUser className="absolute left-3 h-7 w-7 text-[#ffeba7]" />
                      <InputField
                        customStyle={{ paddingLeft: 50 + "px" }}
                        label=""
                        id="username"
                        name="username"
                        type=""
                        placeHolder="Username"
                        value={signUpData.username}
                        onChange={handleSignUpChange}
                        isRequired={false}
                      />
                    </div>

                    <div className="relative mx-auto mt-2 flex max-w-max items-center justify-center">
                      <TbPassword className="absolute left-3 h-7 w-7 text-[#ffeba7]" />
                      <InputField
                        customStyle={{ paddingLeft: 50 + "px" }}
                        label=""
                        id="password"
                        name="password"
                        type="password"
                        placeHolder="Password"
                        value={signUpData.password}
                        onChange={handleSignUpChange}
                        isRequired={false}
                      />
                    </div>
                    <div className="mt-4 flex justify-center gap-10">
                      <div className="flex items-center gap-2">
                        <TbGenderMale className="h-7 w-7 text-[#ffeba7]" />
                        <RadioButton
                          id="male"
                          label=""
                          name="gender"
                          value="male"
                          onChange={handleSignUpChange}
                          checked={signUpData.gender === "male"}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <TbGenderFemale className="h-7 w-7 text-[#ffeba7]" />
                        <RadioButton
                          id="female"
                          label=""
                          name="gender"
                          value="female"
                          onChange={handleSignUpChange}
                          checked={signUpData.gender === "female"}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={signUpLoading}
                      className="font-roboto mt-10 inline-flex h-11 cursor-pointer items-center justify-center rounded-sm border-none bg-[#ffeba7] px-8 text-center text-sm font-semibold tracking-widest text-[#102770] uppercase shadow-[0_8px_24px_0_rgba(255,255,167,.2)] transition-all duration-200 ease-linear hover:bg-[#102770] hover:text-[#ffeba7] hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] focus:bg-[#102770] focus:text-[#ffeba7] focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] active:bg-[#102770] active:text-[#ffeba7] active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] disabled:cursor-none disabled:bg-[rgba(255,255,167,.2)] disabled:text-zinc-50"
                    >
                      {signUpLoading ? "loading" : "Sign up"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </>
  );
};

export default Authentication;
