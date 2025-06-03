const OrderBy = ({
  orderBy,
  setOrderBy,
}: {
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  orderBy: string;
}) => {
  return (
    <select
      value={orderBy}
      onChange={(e) => setOrderBy(e.currentTarget.value)}
      className="font-roboto shadow-main w-max cursor-pointer rounded-full bg-zinc-50 p-1 font-medium text-zinc-800 transition-all duration-100 ease-in-out hover:bg-rose-50 hover:text-rose-900 focus:bg-rose-50 focus:text-rose-900 focus:outline-none md:p-1.5 2xl:p-2"
    >
      <option
        value=""
        disabled
        className="text-medium font-semibold text-zinc-800"
      >
        Order By
      </option>
      <option className="font-medium" value="ascending">
        Ascending
      </option>
      <option className="font-medium" value="descending">
        Descending
      </option>
    </select>
  );
};

export default OrderBy;
