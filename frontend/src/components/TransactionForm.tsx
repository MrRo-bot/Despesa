import {
  MdOutlineCurrencyRupee,
  MdOutlinePayment,
  MdOutlinePostAdd,
  MdOutlineShareLocation,
} from "react-icons/md";
import { TbCalendar, TbCategory, TbTransactionRupee } from "react-icons/tb";

declare function parseFloat(string: FormDataEntryValue | null): number;

const TransactionForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //@ts-expect-error requires HTMLFormElement but function is passing FormEvent<HTMLFormElement>
    const formData = new FormData(e);
    const transactionData = {
      description: formData.get("description"),
      paymentType: formData.get("paymentType"),
      category: formData.get("category"),
      amount: parseFloat(formData.get("amount")),
      location: formData.get("location"),
      date: formData.get("date"),
    };
    console.log("transactionData", transactionData);
  };

  return (
    <form
      className="w-full max-w-xl flex flex-col gap-3 px-3"
      onSubmit={handleSubmit}
    >
      {/* TRANSACTION */}
      <div className="flex flex-wrap">
        <div className="w-full">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-heading ml-8 text-lg">
              Transaction
            </legend>
            <div className="flex gap-2 items-center">
              <TbTransactionRupee className="text-indigo-400 w-6 h-6" />
              <input
                type="text"
                className="grow input input-lg font-content tracking-wider"
                placeholder="Rent, Groceries, Salary, etc."
              />
            </div>
          </fieldset>
        </div>
      </div>
      <div className="grid gap-3">
        {/* LOCATION */}
        <div className="flex flex-wrap gap-3 col-start-1 col-end-3">
          <div className="w-full flex-1 mb-6 md:mb-0">
            <fieldset className="fieldset flex items-center">
              <legend className="fieldset-legend font-heading ml-8 text-lg">
                Location
              </legend>
              <MdOutlineShareLocation className="text-indigo-400 w-7 h-7" />
              <input
                type="text"
                className="grow input-lg input font-content tracking-wider w-full"
                placeholder="New York"
              />
            </fieldset>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="w-full flex-1 mb-6 col-start-1 col-end-2 md:mb-0">
          <fieldset className="fieldset">
            <legend className="fieldset-legend flex items-center font-heading text-lg ml-8">
              Category
            </legend>
            <div className="flex gap-2 items-center">
              <TbCategory className="text-indigo-400 w-7 h-7" />
              <select className="select h-12 tracking-wider ">
                <option disabled={true} className="tracking-wider">
                  Pick an option
                </option>
                <option className="tracking-wider">Expense</option>
                <option className="tracking-wider">Income</option>
                <option className="tracking-wider">Saving</option>
                <option className="tracking-wider">Investment</option>
              </select>
            </div>
          </fieldset>
        </div>

        {/* DATE */}
        <div className="w-full flex-1 col-start-2 col-end-3">
          <fieldset className="fieldset flex items-center">
            <legend className="fieldset-legend font-heading text-lg ml-8">
              Date
            </legend>
            <TbCalendar className="text-indigo-400 w-7 h-7" />
            <input type="date" className="input input-lg font-content" />
          </fieldset>
        </div>

        {/* PAYMENT TYPE */}
        <div className="w-full flex-1 mb-6 col-start-1 col-end-2 md:mb-0">
          <fieldset className="fieldset">
            <legend className="fieldset-legend flex items-center font-heading text-lg ml-8">
              Payment Type{" "}
            </legend>
            <div className="flex gap-2 items-center">
              <MdOutlinePayment className="text-indigo-400 w-7 h-7" />
              <select className="select h-12 tracking-wider ">
                <option disabled={true} className="tracking-wider">
                  Pick an option
                </option>
                <option className="tracking-wider">Mobile Banking</option>
                <option className="tracking-wider">Cash</option>
                <option className="tracking-wider">Card</option>
              </select>
            </div>
          </fieldset>
        </div>

        {/* AMOUNT */}
        <div className="w-full flex-1 mb-6 col-start-2 col-end-3 md:mb-0">
          <fieldset className="fieldset">
            <legend className="fieldset-legend flex items-center font-heading text-lg ml-8">
              Amount{" "}
            </legend>
            <div className="flex gap-2 items-center">
              <MdOutlineCurrencyRupee className="text-indigo-400 w-7 h-7" />
              <input
                type="number"
                className="input validator input-lg font-content tracking-wider"
                required
                placeholder="Eg. 120"
                title="Amount"
              />
            </div>
          </fieldset>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        className="font-heading font-extrabold text-lg mt-5 rounded-xl btn py-6 bg-[#622069] w-max mx-auto text-white border-[#591660] 
      shadow-[0_8px_24px_0_rgba(255,255,167,.2)]
                  active:bg-[#ffeba7]
                  active:text-zinc-900
                  active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)]
                  focus:bg-[#ffeba7]
                  focus:text-zinc-900
                  focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)]
                  hover:bg-[#ffeba7]
                  hover:text-zinc-900
                  hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)]
      "
      >
        <MdOutlinePostAdd className="text-indigo-400 w-5 h-5" />
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
