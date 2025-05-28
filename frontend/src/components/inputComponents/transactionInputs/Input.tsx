import { ChangeEventHandler, JSX } from "react";

interface InputType {
  inputValue?: string | number;
  change?: ChangeEventHandler<HTMLInputElement> | undefined;
  title: string;
  type: string;
  placeHolder?: string;
  icon: JSX.Element;
}

const Input = ({
  inputValue,
  change,
  title,
  type,
  placeHolder,
  icon,
}: InputType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend font-roboto ml-8 text-lg">
        {title.slice(0, 1).toUpperCase() + title.slice(1)}
      </legend>
      <div className="flex items-center gap-2">
        {icon}
        <input
          name={title}
          type={type}
          className="input input-lg font-content grow rounded-full bg-gray-900/70 tracking-wider"
          placeholder={placeHolder}
          value={inputValue}
          onChange={change}
        />
      </div>
    </fieldset>
  );
};

export default Input;
