import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import {
  MdOutlineAccountBalanceWallet,
  MdOutlineAddHome,
  MdOutlineCurrencyRupee,
  MdOutlinePayment,
  MdOutlinePostAdd,
  MdOutlineShareLocation,
} from "react-icons/md";
import { TbCalendar, TbCategory, TbTransactionRupee } from "react-icons/tb";

import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { CREATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";

import customToastFunction from "../utils/Toastify";

import Input from "../components/inputComponents/transactionInputs/Input";
import SelectInput from "../components/inputComponents/transactionInputs/SelectInput";

import { account, income, expenses, paymentType } from "../utils/constants";

import { TransactionFormType } from "../types/types";

const AddTransaction = () => {
  const category = [...expenses, ...income];
  const [formData, setFormData] = useState<TransactionFormType>({
    description: "",
    paymentType: "",
    account: "",
    category: "",
    amount: 0,
    location: "",
    date: "",
  });

  const navigate = useNavigate();

  const { refetch } = useQuery(GET_TRANSACTIONS);

  const [createTransaction, { loading: createLoading }] =
    useMutation(CREATE_TRANSACTION);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await createTransaction({
        variables: {
          input: formData,
        },
      });
      setFormData({
        description: "",
        paymentType: "",
        account: "",
        category: "",
        amount: 0,
        location: "",
        date: "",
      });
      refetch();
      customToastFunction("Transaction added! 🥳", "bottom-right", "light", "");
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

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="shadow-main flex flex-col gap-4 rounded-2xl bg-zinc-800/20 py-2 sm:gap-6 lg:w-[60vw] lg:justify-between lg:gap-7 lg:px-4 2xl:max-w-[60rem]">
        <div className="mx-auto rounded-full bg-zinc-900/10 px-4 py-1">
          <motion.h3
            initial={{ opacity: 0, y: -400, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="bg-gradient-to-r from-pink-800 via-indigo-800 to-pink-800 bg-clip-text text-2xl font-bold text-transparent md:text-4xl lg:text-4xl"
          >
            Add Transaction
          </motion.h3>
        </div>
        <form
          className="mx-auto flex w-full flex-col gap-2 sm:gap-4 xl:gap-10"
          onSubmit={handleSubmit}
        >
          <div className="mx-2 flex flex-col justify-between gap-1 lg:flex-row">
            {/* DESCRIPTION */}
            <motion.div
              initial={{ opacity: 0, x: -400, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
              className="lg:w-4/6"
            >
              <Input
                type="text"
                title="description"
                placeHolder="Rent, Groceries, Salary, etc."
                icon={
                  <TbTransactionRupee className="h-6 w-6 text-indigo-800" />
                }
                inputValue={formData?.description}
                change={handleInputChange}
              />
            </motion.div>

            {/* LOCATION */}
            <motion.div
              initial={{ opacity: 0, x: 400, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
              className="w-full flex-1"
            >
              <Input
                type="text"
                title="location"
                placeHolder="New York"
                icon={
                  <MdOutlineShareLocation className="h-6 w-6 text-indigo-800" />
                }
                inputValue={formData?.location}
                change={handleInputChange}
              />
            </motion.div>
          </div>

          <div className="mx-2 flex flex-col justify-between gap-1 sm:flex-row">
            {/* ACCOUNT */}
            <motion.div
              initial={{ opacity: 0, x: -400, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", delay: 0.3 }}
              className="w-full flex-1"
            >
              <SelectInput
                title="account"
                icon={
                  <MdOutlineAccountBalanceWallet className="h-7 w-7 text-indigo-800" />
                }
                selectValue={formData?.account}
                change={handleInputChange}
                options={account}
              />
            </motion.div>

            {/* CATEGORY */}
            <motion.div
              initial={{ opacity: 0, y: 400, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", delay: 0.4 }}
              className="w-full flex-1"
            >
              <SelectInput
                title="category"
                icon={<TbCategory className="h-7 w-7 text-indigo-800" />}
                selectValue={formData?.category}
                change={handleInputChange}
                options={category}
              />
            </motion.div>

            {/* PAYMENT TYPE */}
            <motion.div
              initial={{ opacity: 0, x: 400, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", delay: 0.5 }}
              className="w-full flex-1"
            >
              <SelectInput
                title="paymentType"
                icon={<MdOutlinePayment className="h-7 w-7 text-indigo-800" />}
                selectValue={formData?.paymentType}
                change={handleInputChange}
                options={paymentType}
              />
            </motion.div>
          </div>

          <div className="mx-2 flex justify-between gap-1">
            {/* DATE */}
            <motion.div
              initial={{ opacity: 0, x: -400, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", delay: 0.6 }}
              className="w-full flex-1"
            >
              <Input
                type="date"
                title="date"
                icon={<TbCalendar className="h-7 w-7 text-indigo-800" />}
                inputValue={formData?.date}
                change={handleInputChange}
              />
            </motion.div>

            {/* AMOUNT */}
            <motion.div
              initial={{ opacity: 0, x: 400, scale: 0.5 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", delay: 0.7 }}
              className="w-full flex-1"
            >
              <Input
                type="text"
                title="amount"
                icon={
                  <MdOutlineCurrencyRupee className="h-7 w-7 text-indigo-800" />
                }
                inputValue={!formData?.amount ? "" : formData?.amount}
                change={handleInputChange}
                placeHolder="1500"
              />
            </motion.div>
          </div>

          {/* SUBMIT BUTTON */}
          <motion.button
            initial={{ opacity: 0, y: 400, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", delay: 0.8 }}
            type="submit"
            disabled={createLoading}
            className="font-roboto btn mx-auto mt-2 w-max rounded-full border-[#591660] bg-[#622069] font-extrabold text-white shadow-[0_8px_24px_0_rgba(255,255,167,.2)] hover:bg-[#ffeba7] hover:text-zinc-900 hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] focus:bg-[#ffeba7] focus:text-zinc-900 focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] active:bg-[#ffeba7] active:text-zinc-900 active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] disabled:cursor-none disabled:bg-[rgba(255,255,167,.2)] disabled:text-zinc-50 sm:text-base xl:py-6 xl:text-lg"
          >
            <MdOutlinePostAdd className="h-5 w-5 text-indigo-400" />
            {createLoading ? "loading..." : "Add Transaction"}
          </motion.button>
        </form>
        {/* HOME BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 400, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", delay: 0.9 }}
          type="submit"
          onClick={() => navigate("/")}
          className="font-roboto btn mx-auto w-max border-[#7b218597] bg-[#912f9c10] font-extrabold text-white shadow-[0_8px_24px_0_rgba(255,255,167,.2)] hover:bg-[#ffeba7b6] hover:text-zinc-900 hover:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] focus:bg-[#ffeaa7b6] focus:text-zinc-900 focus:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] active:bg-[#ffeba7b6] active:text-zinc-900 active:shadow-[0_8px_24px_0_rgba(16,39,112,.2)] disabled:cursor-none disabled:bg-[rgba(255,255,167,.2)] disabled:text-zinc-50 sm:text-base xl:py-4 xl:text-lg"
        >
          <MdOutlineAddHome className="h-5 w-5 text-indigo-400" />
          Go Home
        </motion.button>
      </div>
    </div>
  );
};

export default AddTransaction;
