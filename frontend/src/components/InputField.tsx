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
        className="mt-1 w-full rounded-sm bg-[#110828] px-5 py-3.5 text-lg leading-6 font-medium tracking-wider text-zinc-50 shadow-[0_4px_8px_0_rgb(32,16,75)] transition-all duration-200 ease-linear outline-none focus:shadow-[0_4px_8px_3px_rgb(39,19,92)] active:shadow-[0_4px_8px_3px_rgb(39,19,92)]"
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
