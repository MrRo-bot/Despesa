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
import customToastFunction from "../../utils/Toastify";
import { TransactionFormType } from "../../types/types";

const Transaction = ({ id }: { id: string }) => {
  const { data: transactionData, error: getErr } = useQuery(GET_TRANSACTION, {
    variables: { id: id },
  });

  const [formData, setFormData] = useState<TransactionFormType>({
    description: transactionData?.transaction?.description || "",
    paymentType: transactionData?.transaction?.paymentType || "",
    account: transactionData?.transaction?.account || "",
    category: transactionData?.transaction?.category || "",
    amount: transactionData?.transaction?.amount || 0,
    location: transactionData?.transaction?.location || "",
    date: transactionData?.transaction?.date || "",
  });

  if (getErr) {
    customToastFunction(`${getErr}`, "top-center", "colored", "error");
  }

  const [updateTransaction, { loading: updateLoading, error: updateErr }] =
    useMutation(UPDATE_TRANSACTION);

  if (updateErr) {
    customToastFunction(`${updateErr}`, "top-center", "colored", "error");
  }

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

  return (
    <div className="m-auto flex w-full flex-col items-center gap-5 py-3">
      <div className="mx-auto rounded-full bg-zinc-900/10 px-4 py-1">
        <h3 className="bg-gradient-to-r from-pink-800 via-indigo-800 to-pink-800 bg-clip-text text-2xl font-bold text-transparent md:text-4xl lg:text-4xl">
          Update Transaction
        </h3>
      </div>
      <form className="flex w-full flex-col gap-3 px-3" onSubmit={handleSubmit}>
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
                  className="input input-lg font-content grow rounded-full tracking-wider"
                  placeholder="Rent, Groceries, Salary, etc."
                  value={formData.description}
                  onChange={handleInputChange}
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
                className="input-lg input font-content w-full grow rounded-full tracking-wider"
                placeholder="New York"
                value={formData.location}
                onChange={handleInputChange}
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
                <select
                  name="account"
                  className="select h-12 rounded-full tracking-wider"
                  defaultValue={formData.account}
                  onChange={handleInputChange}
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
          <div className="mb-6 w-full flex-1 md:mb-0">
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-roboto ml-8 flex items-center text-lg">
                Category
              </legend>
              <div className="flex items-center gap-2">
                <TbCategory className="h-7 w-7 text-indigo-800" />
                <select
                  name="category"
                  className="select h-12 rounded-full tracking-wider"
                  defaultValue={formData.category}
                  onChange={handleInputChange}
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
                  className="select h-12 rounded-full tracking-wider"
                  defaultValue={formData.paymentType}
                  onChange={handleInputChange}
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
                className="input input-lg font-content rounded-full"
                value={formData.date}
                onChange={handleInputChange}
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
                  className="input validator input-lg font-content rounded-full tracking-wider"
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
          className="font-roboto btn mx-auto mt-5 w-max rounded-full border-[#591660] bg-[#622069] py-6 text-lg font-extrabold text-white shadow-[0_8px_24px_0_rgba(255,255,167,.2)] hover:bg-[#ffeba7] hover:text-zinc-900 hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] focus:bg-[#ffeba7] focus:text-zinc-900 focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] active:bg-[#ffeba7] active:text-zinc-900 active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] disabled:cursor-none disabled:bg-[rgba(255,255,167,.2)] disabled:text-zinc-50"
        >
          <MdOutlinePostAdd className="h-5 w-5 text-indigo-400" />
          {updateLoading ? "loading..." : "Update Transaction"}
        </button>
      </form>
    </div>
  );
};
export default Transaction;
