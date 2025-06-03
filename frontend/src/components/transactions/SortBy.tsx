const SortBy = ({
  setSortBy,
  sortBy,
}: {
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortBy: string;
}) => {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.currentTarget.value)}
      className="font-roboto shadow-main w-max cursor-pointer rounded-full bg-zinc-50 p-1 font-medium text-zinc-800 transition-all duration-100 ease-in-out hover:bg-rose-50 hover:text-rose-900 focus:bg-rose-50 focus:text-rose-900 focus:outline-none md:p-1.5 2xl:p-2"
    >
      <option
        value=""
        disabled
        className="text-medium font-semibold text-zinc-800"
      >
        Sort By
      </option>
      <option className="font-medium" value="description">
        Description
      </option>
      <option className="font-medium" value="paymentType">
        Payment
      </option>
      <option className="font-medium" value="amount">
        Amount
      </option>
      <option className="font-medium" value="account">
        Account
      </option>
      <option className="font-medium" value="category">
        Category
      </option>
      <option className="font-medium" value="date">
        Date
      </option>
      <option className="font-medium" value="location">
        Location
      </option>
    </select>
  );
};

export default SortBy;
