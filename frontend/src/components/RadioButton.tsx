const RadioButton = ({
  id,
  label,
  name,
  value,
  onChange,
  checked,
}: {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean | undefined;
}) => {
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex items-center p-3 rounded-full cursor-pointer"
        htmlFor={id}
      >
        <input
          name={name}
          type="radio"
          className="appearance-none  h-5 w-5 cursor-pointer rounded-full border-4 border-[#274b52] transition-all checked:border-[#ffeba7]"
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
