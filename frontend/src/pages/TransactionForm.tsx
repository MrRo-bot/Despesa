import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAddHome,
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
import customToastFunction from "../utils/Toastify";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { transactions } from "../../../backend/dummyData/data";

const TransactionForm = () => {
  const [createTransaction, { loading: createLoading }] =
    useMutation(CREATE_TRANSACTION);
  const { refetch } = useQuery(GET_TRANSACTIONS);

  const navigate = useNavigate();
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
    <div className="flex h-[90vh] flex-col items-center justify-center">
      <div className="shadow-main flex min-w-1/2 flex-col gap-10 rounded-2xl bg-zinc-800/20 px-4 py-8">
        <div className="mx-auto rounded-full bg-zinc-900/10 px-4 py-1">
          <h3 className="bg-gradient-to-r from-pink-800 via-indigo-800 to-pink-800 bg-clip-text text-2xl font-bold text-transparent md:text-4xl lg:text-4xl">
            Add Transaction
          </h3>
        </div>
        <form
          className="mx-auto flex w-full flex-col gap-10"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between gap-2">
            {/* Description */}
            <div className="w-4/6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-roboto ml-8 text-lg">
                  Description
                </legend>
                <div className="flex items-center gap-2">
                  <TbTransactionRupee className="h-6 w-6 text-indigo-800" />
                  <input
                    name="description"
                    type="text"
                    className="input input-lg font-content grow tracking-wider"
                    placeholder="Rent, Groceries, Salary, etc."
                  />
                </div>
              </fieldset>
            </div>

            {/* LOCATION */}

            <div className="mb-6 w-full flex-1 md:mb-0">
              <fieldset className="fieldset flex items-center">
                <legend className="fieldset-legend font-roboto ml-8 text-lg">
                  Location
                </legend>
                <MdOutlineShareLocation className="h-7 w-7 text-indigo-800" />
                <input
                  name="location"
                  type="text"
                  className="input-lg input font-content w-full grow tracking-wider"
                  placeholder="New York"
                />
              </fieldset>
            </div>
          </div>

          <div className="flex justify-between gap-2">
            {/* Account */}
            <div className="mb-6 w-full flex-1 md:mb-0">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-roboto ml-8 flex items-center text-lg">
                  Account
                </legend>
                <div className="flex items-center gap-2">
                  <MdOutlineAccountBalanceWallet className="h-7 w-7 text-indigo-800" />
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
            <div className="mb-6 w-full flex-1 md:mb-0">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-roboto ml-8 flex items-center text-lg">
                  Category
                </legend>
                <div className="flex items-center gap-2">
                  <TbCategory className="h-7 w-7 text-indigo-800" />
                  <select
                    name="category"
                    className="select h-12 tracking-wider"
                  >
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

            {/* PAYMENT TYPE */}
            <div className="mb-6 w-full flex-1 md:mb-0">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-roboto ml-8 flex items-center text-lg">
                  Payment Type{" "}
                </legend>
                <div className="flex items-center gap-2">
                  <MdOutlinePayment className="h-7 w-7 text-indigo-800" />
                  <select
                    name="paymentType"
                    className="select h-12 tracking-wider"
                  >
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
          </div>

          <div className="flex justify-between gap-2">
            {/* DATE */}
            <div className="w-full flex-1">
              <fieldset className="fieldset flex items-center">
                <legend className="fieldset-legend font-roboto ml-8 text-lg">
                  Date
                </legend>
                <TbCalendar className="h-7 w-7 text-indigo-800" />
                <input
                  name="date"
                  type="date"
                  className="input input-lg font-content"
                />
              </fieldset>
            </div>

            {/* AMOUNT */}
            <div className="mb-6 w-full flex-1 md:mb-0">
              <fieldset className="fieldset">
                <legend className="fieldset-legend font-roboto ml-8 flex items-center text-lg">
                  Amount{" "}
                </legend>
                <div className="flex items-center gap-2">
                  <MdOutlineCurrencyRupee className="h-7 w-7 text-indigo-800" />
                  <input
                    name="amount"
                    type="text"
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
            className="font-roboto btn mx-auto mt-2 w-max rounded-xl border-[#591660] bg-[#622069] py-6 text-lg font-extrabold text-white shadow-[0_8px_24px_0_rgba(255,255,167,.2)] hover:bg-[#ffeba7] hover:text-zinc-900 hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] focus:bg-[#ffeba7] focus:text-zinc-900 focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] active:bg-[#ffeba7] active:text-zinc-900 active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] disabled:cursor-none disabled:bg-[rgba(255,255,167,.2)] disabled:text-zinc-50"
          >
            <MdOutlinePostAdd className="h-5 w-5 text-indigo-400" />
            {createLoading ? "loading..." : "Add Transaction"}
          </button>
        </form>
        {/* HOME BUTTON */}
        <button
          type="submit"
          onClick={() => navigate("/")}
          className="font-roboto btn mx-auto mt-2 w-max rounded-xl border-[#7b2185] bg-[#912f9c] py-6 text-lg font-extrabold text-white shadow-[0_8px_24px_0_rgba(255,255,167,.2)] hover:bg-[#ffeba7] hover:text-zinc-900 hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] focus:bg-[#ffeba7] focus:text-zinc-900 focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] active:bg-[#ffeba7] active:text-zinc-900 active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] disabled:cursor-none disabled:bg-[rgba(255,255,167,.2)] disabled:text-zinc-50"
        >
          <MdOutlineAddHome className="h-5 w-5 text-indigo-400" />
          Go Home
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;
