import { ChangeEventHandler, FormEventHandler } from "react";

import {
  TbGenderFemale,
  TbGenderMale,
  TbPassword,
  TbUser,
} from "react-icons/tb";
import { SiNamemc } from "react-icons/si";

const SignUp = ({
  handleSubmitSignUp,
  handleSignUpChange,
  signUpData,
  signUpLoading,
}: {
  handleSubmitSignUp: FormEventHandler<HTMLFormElement>;
  handleSignUpChange: ChangeEventHandler<HTMLInputElement>;
  signUpData: {
    name: string;
    username: string;
    password: string;
    gender: string;
  };
  signUpLoading: boolean;
}) => {
  return (
    <div className="absolute top-0 left-0 flex h-full w-full rotate-y-180 flex-col justify-start rounded-md bg-[#170b35] bg-[url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg')] bg-[auto_100%] bg-bottom bg-no-repeat backface-hidden transform-3d">
      <div className="absolute left-0 z-20 block w-full translate-x-0 translate-y-1/10 translate-z-9 px-9 perspective-dramatic">
        <div className="w-full text-center">
          <form className="" onSubmit={handleSubmitSignUp}>
            <div className="relative mx-auto mt-2 flex max-w-max items-center justify-center">
              <SiNamemc className="absolute left-3 h-5 w-5 text-[#ffeba7] md:h-7 md:w-7" />

              <input
                className="mt-1 w-full rounded-sm bg-[#110828] px-5 py-3.5 pl-[40px] leading-6 font-medium tracking-wider transition-all duration-200 ease-linear outline-none valid:shadow-[0_2px_8px_1px_rgb(39,150,92)] invalid:shadow-[0_2px_8px_1px_rgb(200,19,92)] md:pl-[50px] md:text-lg"
                id="name"
                type="text"
                name="name"
                placeholder="Full name"
                value={signUpData.name}
                onChange={handleSignUpChange}
                autoComplete="on"
                required
              />
            </div>

            <div className="relative mx-auto mt-2 flex max-w-max items-center justify-center">
              <TbUser className="absolute left-3 h-5 w-5 text-[#ffeba7] md:h-7 md:w-7" />

              <input
                className="mt-1 w-full rounded-sm bg-[#110828] px-5 py-3.5 pl-[40px] leading-6 font-medium tracking-wider transition-all duration-200 ease-linear outline-none valid:shadow-[0_2px_8px_1px_rgb(39,150,92)] invalid:shadow-[0_2px_8px_1px_rgb(200,19,92)] md:pl-[50px] md:text-lg"
                id="username"
                type="text"
                name="username"
                value={signUpData.username}
                onChange={handleSignUpChange}
                placeholder="Your Username"
                pattern="^(?=.{3,20}$)(?![_.\-])(?!.*[_.\-]{2})[a-zA-Z0-9_\-]+([^._\-])$"
                autoComplete="on"
                required
              />
            </div>

            <div className="relative mx-auto mt-2 flex max-w-max items-center justify-center">
              <TbPassword className="absolute left-3 h-5 w-5 text-[#ffeba7] md:h-7 md:w-7" />

              <input
                className="mt-1 w-full rounded-sm bg-[#110828] px-5 py-3.5 pl-[40px] leading-6 font-medium tracking-wider transition-all duration-200 ease-linear outline-none valid:shadow-[0_2px_8px_1px_rgb(39,150,92)] invalid:shadow-[0_2px_8px_1px_rgb(200,19,92)] md:pl-[50px] md:text-lg"
                id="password"
                type="password"
                name="password"
                value={signUpData.password}
                onChange={handleSignUpChange}
                placeholder="Your Password"
                pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$"
                autoComplete="off"
                required
              />
            </div>
            <div className="mt-4 flex justify-center gap-10">
              <div className="flex items-center md:gap-2">
                <TbGenderMale className="h-5 w-5 text-[#ffeba7] md:h-7 md:w-7" />

                <div className="inline-flex items-center">
                  <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor="male"
                  >
                    <input
                      name="gender"
                      type="radio"
                      className="h-5 w-5 cursor-pointer appearance-none rounded-full border-4 border-[#274b52] transition-all checked:border-[#ffeba7]"
                      id="male"
                      value="male"
                      onChange={handleSignUpChange}
                      checked={signUpData.gender === "male"}
                    />
                  </label>
                </div>
              </div>
              <div className="flex items-center md:gap-2">
                <TbGenderFemale className="h-5 w-5 text-[#ffeba7] md:h-7 md:w-7" />

                <div className="inline-flex items-center">
                  <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor="female"
                  >
                    <input
                      name="gender"
                      type="radio"
                      className="h-5 w-5 cursor-pointer appearance-none rounded-full border-4 border-[#274b52] transition-all checked:border-[#ffeba7]"
                      id="female"
                      value="female"
                      onChange={handleSignUpChange}
                      checked={signUpData.gender === "female"}
                    />
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={signUpLoading}
              className="font-roboto mt-7 inline-flex h-10 cursor-pointer items-center justify-center rounded-sm border-none bg-[#ffeba7] px-4 text-center text-xs font-semibold tracking-widest text-[#102770] uppercase shadow-[0_8px_24px_0_rgba(255,255,167,.2)] transition-all duration-200 ease-linear hover:bg-[#102770] hover:text-[#ffeba7] hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] focus:bg-[#102770] focus:text-[#ffeba7] focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] active:bg-[#102770] active:text-[#ffeba7] active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] disabled:cursor-none disabled:bg-[rgba(255,255,167,.2)] disabled:text-zinc-50 md:mt-10 md:px-8 md:text-sm"
            >
              {signUpLoading ? "loading" : "Sign up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
