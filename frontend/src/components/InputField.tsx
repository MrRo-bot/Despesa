const InputField = ({
  label,
  id,
  name,
  type = "text",
  onChange,
  value,
  placeHolder,
  customStyle,
  isRequired,
}: {
  label: string;
  id: string;
  name: string;
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  placeHolder: string;
  customStyle: object;
  isRequired: boolean;
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        style={customStyle}
        className="mt-1 py-3.5 px-5 font-medium w-full rounded-sm text-zinc-50 leading-6 outline-none font-content text-lg tracking-wider bg-[#110828] shadow-[0_4px_8px_0_rgb(32,16,75)]
        active:shadow-[0_4px_8px_3px_rgb(39,19,92)]
        focus:shadow-[0_4px_8px_3px_rgb(39,19,92)]
        transition-all duration-200 ease-linear
        "
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        placeholder={placeHolder}
        required={isRequired}
      />
    </div>
  );
};

export default InputField;
