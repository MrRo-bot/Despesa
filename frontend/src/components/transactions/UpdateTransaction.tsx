import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

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
import customToastFunction from "../../utils/Toastify";

import { account, income, expenses, paymentType } from "../../utils/constants";

import Input from "../inputComponents/transactionInputs/Input";
import SelectInput from "../inputComponents/transactionInputs/SelectInput";

import { TransactionFormType } from "../../types/types";

const UpdateTransaction = ({ id }: { id: string }) => {
  const category = [...expenses, ...income];
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
    customToastFunction(`${getErr}`, "bottom-right", "colored", "error");
  }

  const [updateTransaction, { loading: updateLoading, error: updateErr }] =
    useMutation(UPDATE_TRANSACTION);

  if (updateErr) {
    customToastFunction(`${updateErr}`, "bottom-right", "colored", "error");
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
      customToastFunction(`📝 Changes Made`, "bottom-right", "light", "");
    } catch (error) {
      customToastFunction(`${error}`, "bottom-right", "colored", "error");
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
        <div className="flex flex-col justify-between gap-2 xl:flex-row">
          {/* DESCRIPTION */}
          <div className="xl:w-4/6">
            <Input
              type="text"
              title="description"
              placeHolder="Rent, Groceries, Salary, etc."
              icon={<TbTransactionRupee className="h-6 w-6 text-indigo-800" />}
              inputValue={formData?.description}
              change={handleInputChange}
            />
          </div>

          {/* LOCATION */}
          <div className="w-full flex-1">
            <Input
              type="text"
              title="location"
              placeHolder="New York"
              icon={
                <MdOutlineShareLocation className="h-7 w-7 text-indigo-800" />
              }
              inputValue={formData?.location}
              change={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 xl:flex-row">
          {/* ACCOUNT */}
          <div className="w-full flex-1">
            {formData?.account.length > 1 && (
              <SelectInput
                title="account"
                icon={
                  <MdOutlineAccountBalanceWallet className="h-7 w-7 text-indigo-800" />
                }
                selectValue={formData?.account}
                change={handleInputChange}
                options={account}
              />
            )}
          </div>

          {/* CATEGORY */}
          <div className="w-full flex-1">
            {formData?.category.length > 1 && (
              <SelectInput
                title="category"
                icon={<TbCategory className="h-7 w-7 text-indigo-800" />}
                selectValue={formData?.category}
                change={handleInputChange}
                options={category}
              />
            )}
          </div>

          {/* PAYMENT TYPE */}
          <div className="w-full flex-1">
            {formData?.paymentType.length > 1 && (
              <SelectInput
                title="paymentType"
                icon={<MdOutlinePayment className="h-7 w-7 text-indigo-800" />}
                selectValue={formData?.paymentType}
                change={handleInputChange}
                options={paymentType}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 xl:flex-row">
          {/* DATE */}
          <div className="w-full flex-1">
            <Input
              type="date"
              title="date"
              icon={<TbCalendar className="h-7 w-7 text-indigo-800" />}
              inputValue={formData?.date}
              change={handleInputChange}
            />
          </div>

          {/* AMOUNT */}
          <div className="w-full flex-1">
            <Input
              type="text"
              title="amount"
              icon={
                <MdOutlineCurrencyRupee className="h-7 w-7 text-indigo-800" />
              }
              inputValue={formData?.amount}
              change={handleInputChange}
              placeHolder="2000"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={updateLoading}
          className="font-roboto btn mx-auto mt-5 w-max rounded-full border-[#591660] bg-[#622069] py-6 text-lg font-extrabold text-white shadow-[0_8px_24px_0_rgba(255,255,167,.2)] hover:bg-[#ffeba7] hover:text-zinc-900 hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] focus:bg-[#ffeba7] focus:text-zinc-900 focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] active:bg-[#ffeba7] active:text-zinc-900 active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] disabled:cursor-none disabled:bg-[rgba(255,255,167,.2)] disabled:text-zinc-50"
        >
          <MdOutlinePostAdd className="h-5 w-5 text-indigo-400" />
          {updateLoading ? "loading..." : "Update"}
        </button>
      </form>
    </div>
  );
};
export default UpdateTransaction;
