import {
  TbGenderFemale,
  TbGenderMale,
  TbPassword,
  TbUser,
} from "react-icons/tb";
import { SiNamemc } from "react-icons/si";

import RadioButton from "../RadioButton";
import InputField from "../InputField";

const SignUp = ({
  //@ts-expect-error: function
  handleSubmitSignUp,
  //@ts-expect-error: function
  handleSignUpChange,
  //@ts-expect-error: object containing name, username, pass and gender
  signUpData,
  //@ts-expect-error: boolean
  signUpLoading,
}) => {
  return (
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
  );
};
export default SignUp;
