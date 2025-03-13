import { useState } from "react";
import InputField from "../components/InputField";
import {
  TbAt,
  TbGenderFemale,
  TbGenderMale,
  TbLock,
  TbPassword,
  TbUser,
} from "react-icons/tb";
import { SiNamemc } from "react-icons/si";
import RadioButton from "../components/RadioButton";

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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(loginData);
  };
  return (
    <main className="relative flex flex-col items-center overflow-hidden ">
      <h2 className="flex text-base lg:text-xl font-bold font-heading relative z-50 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 text-transparent bg-clip-text">
        <span className="pl-5">Log In</span>
        <span className="ml-10">Sign Up</span>
      </h2>
      <label
        htmlFor="switch"
        className={`relative cursor-pointer w-16 rounded-full h-3 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 mt-6 mb-10
        before:content-["⇖"]
        before:absolute
        before:z-10
        before:-top-[9px]
        before:text-lg
        before:text-center
        before:rounded-full
        before:w-8
        before:h-8
        before:bg-blue-800
        before:text-zinc-50
        before:transition-all
        before:duration-500
        has-checked:before:rotate-[-270deg]
        has-checked:before:translate-x-10`}
      >
        <input
          onChange={handleCheck}
          className="sr-only"
          type="checkbox"
          name="switch"
          id="switch"
        />
      </label>
      <section className="relative transform-3d perspective-[800px] w-1/4 mx-auto my-5 h-[55vh]">
        <div
          className={`w-full h-full absolute top-0 left-0 transform-3d transition-all duration-700 ease-out ${toggle && "rotate-y-180"}`}
        >
          <div className="w-full h-full bg-[#170b35] bg-[url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg')] bg-bottom bg-no-repeat bg-[auto_100%] absolute rounded-md left-0 top-0 transform-3d backface-hidden flex flex-col justify-start">
            <div className="absolute w-full px-9 left-0 translate-x-0 translate-y-1/2 translate-z-9 perspective-dramatic z-20 block">
              <div className="w-full text-center">
                <form className="" onSubmit={handleSubmit}>
                  <div className="relative flex items-center justify-center max-w-max mx-auto">
                    <TbAt className="absolute w-7 h-7 left-3 text-[#ffeba7]" />
                    <InputField
                      customStyle={{ paddingLeft: 50 + "px" }}
                      label=""
                      id="username"
                      name="username"
                      type=""
                      placeHolder="Your Email"
                      value={loginData.username}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="relative flex items-center justify-center max-w-max mx-auto mt-2">
                    <TbLock className="absolute w-7 h-7 left-3 text-[#ffeba7]" />
                    <InputField
                      customStyle={{ paddingLeft: 50 + "px" }}
                      label=""
                      id="password"
                      name="password"
                      type={"password"}
                      placeHolder="Your Password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <button
                    className="font-heading rounded-sm cursor-pointer h-11 text-sm mt-10 font-semibold uppercase transition-all duration-200 ease-linear px-8 tracking-widest inline-flex items-center justify-center text-center border-none bg-[#ffeba7] text-[#102770] shadow-[0_8px_24px_0_rgba(255,255,167,.2)]
                  active:bg-[#102770]
                  active:text-[#ffeba7]
                  active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)]
                  focus:bg-[#102770]
                  focus:text-[#ffeba7]
                  focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)]
                  hover:bg-[#102770]
                  hover:text-[#ffeba7]
                  hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)]
                  "
                  >
                    log in
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="w-full h-full bg-[#170b35] bg-[url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg')] bg-bottom bg-no-repeat bg-[auto_100%] absolute rounded-md left-0 top-0 transform-3d backface-hidden flex flex-col justify-start rotate-y-180">
            <div className="absolute w-full px-9 left-0 translate-x-0 translate-y-1/10 translate-z-9 perspective-dramatic z-20 block">
              <div className="w-full text-center">
                <form className="" onSubmit={handleSubmit}>
                  <div className="relative flex items-center justify-center max-w-max mx-auto mt-2">
                    <SiNamemc className="absolute w-7 h-7 left-3 text-[#ffeba7]" />
                    <InputField
                      customStyle={{ paddingLeft: 50 + "px" }}
                      label=""
                      id="name"
                      name="name"
                      type=""
                      placeHolder="Full name"
                      value={signUpData.name}
                      onChange={handleSignUpChange}
                    />
                  </div>

                  <div className="relative flex items-center justify-center max-w-max mx-auto mt-2">
                    <TbUser className="absolute w-7 h-7 left-3 text-[#ffeba7]" />
                    <InputField
                      customStyle={{ paddingLeft: 50 + "px" }}
                      label=""
                      id="username"
                      name="username"
                      type=""
                      placeHolder="Username"
                      value={signUpData.username}
                      onChange={handleSignUpChange}
                    />
                  </div>

                  <div className="relative flex items-center justify-center max-w-max mx-auto mt-2">
                    <TbPassword className="absolute w-7 h-7 left-3 text-[#ffeba7]" />
                    <InputField
                      customStyle={{ paddingLeft: 50 + "px" }}
                      label=""
                      id="password"
                      name="password"
                      type="password"
                      placeHolder="Password"
                      value={signUpData.password}
                      onChange={handleSignUpChange}
                    />
                  </div>
                  <div className="flex gap-10 justify-center mt-4">
                    <div className="flex gap-2 items-center">
                      <TbGenderMale className=" w-7 h-7  text-[#ffeba7]" />
                      <RadioButton
                        id="male"
                        label=""
                        name="gender"
                        value="male"
                        onChange={handleSignUpChange}
                        checked={signUpData.gender === "male"}
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <TbGenderFemale className=" w-7 h-7  text-[#ffeba7]" />
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
                    className="font-heading rounded-sm cursor-pointer h-11 text-sm mt-10 font-semibold uppercase transition-all duration-200 ease-linear px-8 tracking-widest inline-flex items-center justify-center text-center border-none bg-[#ffeba7] text-[#102770] shadow-[0_8px_24px_0_rgba(255,255,167,.2)]
                  active:bg-[#102770]
                  active:text-[#ffeba7]
                  active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)]
                  focus:bg-[#102770]
                  focus:text-[#ffeba7]
                  focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)]
                  hover:bg-[#102770]
                  hover:text-[#ffeba7]
                  hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)]
                  "
                  >
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Authentication;
