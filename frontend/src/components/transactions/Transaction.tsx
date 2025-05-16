import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import {
  MdOutlineAccountBalanceWallet,
  MdOutlineCurrencyRupee,
  MdOutlinePayment,
  MdOutlinePostAdd,
  MdOutlineShareLocation,
} from "react-icons/md";
import { TbCalendar, TbCategory, TbTransactionRupee } from "react-icons/tb";
import { UPDATE_TRANSACTION } from "../../graphql/mutations/transaction.mutation";
import { GET_TRANSACTION } from "../../graphql/queries/transaction.query";
import { account, category, paymentType } from "../../utils/constants";
import customToastFunction from "../Toastify";
import { TransactionFormType } from "../../types/types";

const Transaction = ({ id }: { id: string }) => {
  const { data: transactionData, error: getErr } = useQuery(GET_TRANSACTION, {
    variables: { id: id },
  });

  if (getErr) {
    customToastFunction(`${getErr}`, "top-center", "colored", "error");
  }

  const [updateTransaction, { loading: updateLoading, error: updateErr }] =
    useMutation(UPDATE_TRANSACTION);

  if (updateErr) {
    customToastFunction(`${updateErr}`, "top-center", "colored", "error");
  }

  const [formData, setFormData] = useState<TransactionFormType>({
    description: transactionData?.transaction?.description || "",
    paymentType: transactionData?.transaction?.paymentType || "",
    account: transactionData?.transaction?.account || "",
    category: transactionData?.transaction?.category || "",
    amount: transactionData?.transaction?.amount || 0,
    location: transactionData?.transaction?.location || "",
    date: transactionData?.transaction?.date || "",
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await updateTransaction({
        variables: {
          input: {
            ...formData,
            transactionId: id,
          },
        },
      });

      customToastFunction(`📝 Changes Made`, "top-center", "light", "");
    } catch (error) {
      customToastFunction(`${error}`, "top-center", "colored", "error");
    }
  };

  const handleInputChange = (e: {
    target: { name: string; value: string | number };
  }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "amount" ? +value : value,
    }));
  };

  useEffect(() => {
    if (transactionData) {
      setFormData({
        description: transactionData?.transaction?.description,
        paymentType: transactionData?.transaction?.paymentType,
        account: transactionData?.transaction?.account,
        category: transactionData?.transaction?.category,
        amount: transactionData?.transaction?.amount,
        location: transactionData?.transaction?.location,
        date: new Date(+transactionData.transaction.date)
          .toISOString()
          .substring(0, 10),
      });
    }
  }, [transactionData]);

  console.log(transactionData, formData);

  return (
    <div className="flex flex-col items-center max-w-4xl gap-5 pt-5 pb-10 m-auto">
      <h3 className="relative z-50 inline-block mx-auto text-2xl font-bold text-transparent bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 bg-clip-text md:text-4xl lg:text-4xl">
        Update this transaction
      </h3>
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
                  value={formData.description}
                  onChange={handleInputChange}
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
                  value={formData.location}
                  onChange={handleInputChange}
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
                <select
                  name="account"
                  className="h-12 tracking-wider select"
                  defaultValue={formData.account}
                >
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
                <select
                  name="category"
                  className="h-12 tracking-wider select"
                  defaultValue={formData.category}
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
                value={formData.date}
                onChange={handleInputChange}
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
                <select
                  name="paymentType"
                  className="h-12 tracking-wider select"
                  defaultValue={formData.paymentType}
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
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={updateLoading}
          className="font-heading btn mx-auto mt-5 w-max rounded-xl border-[#591660] bg-[#622069] py-6 text-lg font-extrabold text-white shadow-[0_8px_24px_0_rgba(255,255,167,.2)] hover:bg-[#ffeba7] hover:text-zinc-900 hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] focus:bg-[#ffeba7] focus:text-zinc-900 focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] active:bg-[#ffeba7] active:text-zinc-900 active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] disabled:cursor-none disabled:bg-[rgba(255,255,167,.2)] disabled:text-zinc-50"
        >
          <MdOutlinePostAdd className="w-5 h-5 text-indigo-400" />
          {updateLoading ? "loading..." : "Update Transaction"}
        </button>
      </form>
    </div>
  );
};
export default Transaction;
