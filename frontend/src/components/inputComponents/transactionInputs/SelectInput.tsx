import { SelectType } from "../../../types/types";

const SelectInput = ({
  selectValue,
  change,
  title,
  icon,
  options,
}: SelectType) => {
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend font-roboto ml-8 flex items-center text-base md:text-lg">
        {title.slice(0, 1).toUpperCase() + title.slice(1)}
      </legend>
      <div className="flex items-center gap-2">
        {icon}
        <select
          name={title}
          className="select h-12 w-full rounded-full bg-zinc-900/70 tracking-wider"
          defaultValue={selectValue || "default"}
          onChange={change}
        >
          <option disabled={true} value="default" className="tracking-wider">
            Pick an option
          </option>

          {options?.map((op: string) => (
            <option key={op} value={op} className="tracking-wider">
              {op[0].toUpperCase() + op.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  );
};

export default SelectInput;
