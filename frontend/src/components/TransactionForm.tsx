import {
  MdOutlineAccountBalanceWallet,
  MdOutlineCurrencyRupee,
  MdOutlinePayment,
  MdOutlinePostAdd,
  MdOutlineShareLocation,
} from "react-icons/md";

import { useMutation, useQuery } from "@apollo/client";
import { TbCalendar, TbCategory, TbTransactionRupee } from "react-icons/tb";
import { CREATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { account, category, paymentType } from "../utils/constants";
import customToastFunction from "./Toastify";
// import { useEffect } from "react";
// import { transactions } from "../../../backend/dummyData/data";

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
      amount: Number(formData.get("amount")) || 0,
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
      customToastFunction("Transaction added! 🥳", "top-center", "light", "");
    } catch (error) {
      customToastFunction(`${error}`, "top-center", "colored", "error");
    }
  };

  return (
    <form
      className="flex flex-col w-full max-w-xl gap-3 px-3"
      onSubmit={handleSubmit}
    >
      {/* Description */}
      <div className="flex flex-wrap">
        <div className="w-full">
          <fieldset className="fieldset">
            <legend className="ml-8 text-lg fieldset-legend font-heading">
              Description
            </legend>
            <div className="flex items-center gap-2">
              <TbTransactionRupee className="w-6 h-6 text-indigo-400" />
              <input
                name="description"
                type="text"
                className="tracking-wider input input-lg font-content grow"
                placeholder="Rent, Groceries, Salary, etc."
              />
            </div>
          </fieldset>
        </div>
      </div>
      <div className="grid gap-3">
        {/* LOCATION */}
        <div className="flex flex-wrap col-start-1 col-end-3 gap-3">
          <div className="flex-1 w-full mb-6 md:mb-0">
            <fieldset className="flex items-center fieldset">
              <legend className="ml-8 text-lg fieldset-legend font-heading">
                Location
              </legend>
              <MdOutlineShareLocation className="text-indigo-400 h-7 w-7" />
              <input
                name="location"
                type="text"
                className="w-full tracking-wider input-lg input font-content grow"
                placeholder="New York"
              />
            </fieldset>
          </div>
        </div>

        {/* Account */}
        <div className="flex-1 w-full col-start-1 col-end-2 mb-6 md:mb-0">
          <fieldset className="fieldset">
            <legend className="flex items-center ml-8 text-lg fieldset-legend font-heading">
              Account
            </legend>
            <div className="flex items-center gap-2">
              <MdOutlineAccountBalanceWallet className="text-indigo-400 h-7 w-7" />
              <select name="account" className="h-12 tracking-wider select">
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
        <div className="flex-1 w-full col-start-1 col-end-2 mb-6 md:mb-0">
          <fieldset className="fieldset">
            <legend className="flex items-center ml-8 text-lg fieldset-legend font-heading">
              Category
            </legend>
            <div className="flex items-center gap-2">
              <TbCategory className="text-indigo-400 h-7 w-7" />
              <select name="category" className="h-12 tracking-wider select">
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
        <div className="flex-1 w-full col-start-2 col-end-3">
          <fieldset className="flex items-center fieldset">
            <legend className="ml-8 text-lg fieldset-legend font-heading">
              Date
            </legend>
            <TbCalendar className="text-indigo-400 h-7 w-7" />
            <input
              name="date"
              type="date"
              className="input input-lg font-content"
            />
          </fieldset>
        </div>

        {/* PAYMENT TYPE */}
        <div className="flex-1 w-full col-start-1 col-end-2 mb-6 md:mb-0">
          <fieldset className="fieldset">
            <legend className="flex items-center ml-8 text-lg fieldset-legend font-heading">
              Payment Type{" "}
            </legend>
            <div className="flex items-center gap-2">
              <MdOutlinePayment className="text-indigo-400 h-7 w-7" />
              <select name="paymentType" className="h-12 tracking-wider select">
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
        <div className="flex-1 w-full col-start-2 col-end-3 mb-6 md:mb-0">
          <fieldset className="fieldset">
            <legend className="flex items-center ml-8 text-lg fieldset-legend font-heading">
              Amount{" "}
            </legend>
            <div className="flex items-center gap-2">
              <MdOutlineCurrencyRupee className="text-indigo-400 h-7 w-7" />
              <input
                name="amount"
                type="text"
                className="tracking-wider input validator input-lg font-content"
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
        <MdOutlinePostAdd className="w-5 h-5 text-indigo-400" />
        {createLoading ? "loading..." : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;
