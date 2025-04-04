import {
  MdOutlineAccountBalanceWallet,
  MdOutlineCurrencyRupee,
  MdOutlinePayment,
  MdOutlinePostAdd,
  MdOutlineShareLocation,
} from "react-icons/md";
import { TbCalendar, TbCategory, TbTransactionRupee } from "react-icons/tb";
import { CREATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { Bounce, toast } from "react-toastify";
import { account, category, paymentType } from "../utils/selectOptions";
// import { useEffect } from "react";
// import { transactions } from "../../../backend/dummyData/data";

declare function parseFloat(string: FormDataEntryValue | null): number;

const TransactionForm = () => {
  const [createTransaction, { loading: createLoading }] =
    useMutation(CREATE_TRANSACTION);
  const { refetch } = useQuery(GET_TRANSACTIONS);

  // used this code only once to input transactions from the custom dummy dataset
  // useEffect(() => {
  //   transactions.map(async (x) => {
  //     await createTransaction({
  //       variables: {
  //         input: x,
  //       },
  //     });
  //   });
  // }, [createTransaction]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);
    const transactionData = {
      description: formData.get("description"),
      paymentType: formData.get("paymentType"),
      account: formData.get("account"),
      category: formData.get("category"),
      amount: parseFloat(formData.get("amount")),
      location: formData.get("location"),
      date: formData.get("date"),
    };

    try {
      await createTransaction({
        variables: {
          input: transactionData,
        },
      });
      form.reset();
      refetch();
      toast(`Transaction added! 🥳`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "font-bold",
      });
    } catch (error) {
      toast.error(`${error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <form
      className="flex w-full max-w-xl flex-col gap-3 px-3"
      onSubmit={handleSubmit}
    >
      {/* Description */}
      <div className="flex flex-wrap">
        <div className="w-full">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-heading ml-8 text-lg">
              Description
            </legend>
            <div className="flex items-center gap-2">
              <TbTransactionRupee className="h-6 w-6 text-indigo-400" />
              <input
                name="description"
                type="text"
                className="input input-lg font-content grow tracking-wider"
                placeholder="Rent, Groceries, Salary, etc."
              />
            </div>
          </fieldset>
        </div>
      </div>
      <div className="grid gap-3">
        {/* LOCATION */}
        <div className="col-start-1 col-end-3 flex flex-wrap gap-3">
          <div className="mb-6 w-full flex-1 md:mb-0">
            <fieldset className="fieldset flex items-center">
              <legend className="fieldset-legend font-heading ml-8 text-lg">
                Location
              </legend>
              <MdOutlineShareLocation className="h-7 w-7 text-indigo-400" />
              <input
                name="location"
                type="text"
                className="input-lg input font-content w-full grow tracking-wider"
                placeholder="New York"
              />
            </fieldset>
          </div>
        </div>

        {/* Account */}
        <div className="col-start-1 col-end-2 mb-6 w-full flex-1 md:mb-0">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-heading ml-8 flex items-center text-lg">
              Account
            </legend>
            <div className="flex items-center gap-2">
              <MdOutlineAccountBalanceWallet className="h-7 w-7 text-indigo-400" />
              <select name="account" className="select h-12 tracking-wider">
                <option disabled={true} className="tracking-wider">
                  Pick an option
                </option>
                {account.map((op) => (
                  <option key={op} value={op} className="tracking-wider">
                    {op[0].toUpperCase() + op.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
        </div>

        {/* Category */}
        <div className="col-start-1 col-end-2 mb-6 w-full flex-1 md:mb-0">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-heading ml-8 flex items-center text-lg">
              Category
            </legend>
            <div className="flex items-center gap-2">
              <TbCategory className="h-7 w-7 text-indigo-400" />
              <select name="category" className="select h-12 tracking-wider">
                <option disabled={true} className="tracking-wider">
                  Pick an option
                </option>
                {category.map((op) => (
                  <option key={op} value={op} className="tracking-wider">
                    {op[0].toUpperCase() + op.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
        </div>

        {/* DATE */}
        <div className="col-start-2 col-end-3 w-full flex-1">
          <fieldset className="fieldset flex items-center">
            <legend className="fieldset-legend font-heading ml-8 text-lg">
              Date
            </legend>
            <TbCalendar className="h-7 w-7 text-indigo-400" />
            <input
              name="date"
              type="date"
              className="input input-lg font-content"
            />
          </fieldset>
        </div>

        {/* PAYMENT TYPE */}
        <div className="col-start-1 col-end-2 mb-6 w-full flex-1 md:mb-0">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-heading ml-8 flex items-center text-lg">
              Payment Type{" "}
            </legend>
            <div className="flex items-center gap-2">
              <MdOutlinePayment className="h-7 w-7 text-indigo-400" />
              <select name="paymentType" className="select h-12 tracking-wider">
                <option disabled={true} className="tracking-wider">
                  Pick an option
                </option>
                {paymentType.map((op) => (
                  <option key={op} value={op} className="tracking-wider">
                    {op[0].toUpperCase() + op.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
        </div>

        {/* AMOUNT */}
        <div className="col-start-2 col-end-3 mb-6 w-full flex-1 md:mb-0">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-heading ml-8 flex items-center text-lg">
              Amount{" "}
            </legend>
            <div className="flex items-center gap-2">
              <MdOutlineCurrencyRupee className="h-7 w-7 text-indigo-400" />
              <input
                name="amount"
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
        type="submit"
        disabled={createLoading}
        className="font-heading btn mx-auto mt-5 w-max rounded-xl border-[#591660] bg-[#622069] py-6 text-lg font-extrabold text-white shadow-[0_8px_24px_0_rgba(255,255,167,.2)] hover:bg-[#ffeba7] hover:text-zinc-900 hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] focus:bg-[#ffeba7] focus:text-zinc-900 focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] active:bg-[#ffeba7] active:text-zinc-900 active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] disabled:cursor-none disabled:bg-[rgba(255,255,167,.2)] disabled:text-zinc-50"
      >
        <MdOutlinePostAdd className="h-5 w-5 text-indigo-400" />
        {createLoading ? "loading..." : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
