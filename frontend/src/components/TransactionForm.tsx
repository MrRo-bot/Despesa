import {
  MdOutlineAccountBalanceWallet,
  MdOutlineCurrencyRupee,
  MdOutlinePayment,
  MdOutlinePostAdd,
  MdOutlineShareLocation,
} from "react-icons/md";
import { TbCalendar, TbTransactionRupee } from "react-icons/tb";
import { CREATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { Bounce, toast } from "react-toastify";
// import { useEffect } from "react";
// import { transactions } from "../../../backend/dummyData/data";

declare function parseFloat(string: FormDataEntryValue | null): number;

const TransactionForm = () => {
  const [createTransaction, { loading: createLoading }] =
    useMutation(CREATE_TRANSACTION);
  const { refetch } = useQuery(GET_TRANSACTIONS);

  // used this code only once to input 287 transactions from the custom dummy dataset
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
        position: "bottom-left",
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
        position: "bottom-left",
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
      className="w-full max-w-xl flex flex-col gap-3 px-3"
      onSubmit={handleSubmit}
    >
      {/* Description */}
      <div className="flex flex-wrap">
        <div className="w-full">
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-heading ml-8 text-lg">
              Description
            </legend>
            <div className="flex gap-2 items-center">
              <TbTransactionRupee className="text-indigo-400 w-6 h-6" />
              <input
                name="description"
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
                name="location"
                type="text"
                className="grow input-lg input font-content tracking-wider w-full"
                placeholder="New York"
              />
            </fieldset>
          </div>
        </div>

        {/* Account */}
        <div className="w-full flex-1 mb-6 col-start-1 col-end-2 md:mb-0">
          <fieldset className="fieldset">
            <legend className="fieldset-legend flex items-center font-heading text-lg ml-8">
              Account
            </legend>
            <div className="flex gap-2 items-center">
              <MdOutlineAccountBalanceWallet className="text-indigo-400 w-7 h-7" />
              <select name="account" className="select h-12 tracking-wider ">
                <option disabled={true} className="tracking-wider">
                  Pick an option
                </option>
                <option value={"expense"} className="tracking-wider">
                  Expense
                </option>
                <option value={"income"} className="tracking-wider">
                  Income
                </option>
                <option value={"saving"} className="tracking-wider">
                  Saving
                </option>
                <option value={"investment"} className="tracking-wider">
                  Investment
                </option>
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
            <input
              name="date"
              type="date"
              className="input input-lg font-content"
            />
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
              <select
                name="paymentType"
                className="select h-12 tracking-wider "
              >
                <option disabled={true} className="tracking-wider">
                  Pick an option
                </option>
                <option value={"mobile banking"} className="tracking-wider">
                  Mobile Banking
                </option>
                <option value={"cash"} className="tracking-wider">
                  Cash
                </option>
                <option value={"card"} className="tracking-wider">
                  Card
                </option>
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
                      disabled:bg-[rgba(255,255,167,.2)]
                   disabled:text-zinc-50
                   disabled:cursor-none
      "
      >
        <MdOutlinePostAdd className="text-indigo-400 w-5 h-5" />
        {createLoading ? "loading..." : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
