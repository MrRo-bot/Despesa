import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

import {
  MdOutlineAccountBalanceWallet,
  MdOutlineCurrencyRupee,
  MdOutlinePayment,
  MdOutlinePostAdd,
  MdOutlineShareLocation,
} from "react-icons/md";
import { TbCalendar, TbCategory, TbTransactionRupee } from "react-icons/tb";
import { UPDATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import { useNavigate, useParams } from "react-router-dom";
import { GET_TRANSACTION } from "../graphql/queries/transaction.query";
import { account, category, paymentType } from "../utils/selectOptions";

const Transaction = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: transactionData, error: getErr } = useQuery(GET_TRANSACTION, {
    variables: { id: id },
  });

  if (getErr) {
    toast.error(`${getErr}`, {
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

  const [updateTransaction, { loading: updateLoading, error: updateErr }] =
    useMutation(UPDATE_TRANSACTION);

  if (updateErr) {
    toast.error(`${updateErr}`, {
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

  const [formData, setFormData] = useState({
    description: transactionData?.transaction?.description || "",
    paymentType: transactionData?.transaction?.paymentType || "",
    account: transactionData?.transaction?.account || "",
    category: transactionData?.transaction?.category || "",
    amount: transactionData?.transaction?.amount || "",
    location: transactionData?.transaction?.location || "",
    date: transactionData?.transaction?.date || "",
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const amount = parseFloat(formData.amount); //string to number
    try {
      await updateTransaction({
        variables: {
          input: {
            ...formData,
            amount,
            transactionId: id,
          },
        },
      });
      toast(`📝 Changes Made`, {
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
      navigate("/");
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

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
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
    <div className="mx-auto flex h-screen max-w-4xl flex-col items-center">
      <p className="relative z-50 mr-4 mb-4 inline-block bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 bg-clip-text text-center text-2xl font-bold text-transparent md:text-4xl lg:text-4xl">
        Update this transaction
      </p>
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
                  value={formData.description}
                  onChange={handleInputChange}
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
                  value={formData.location}
                  onChange={handleInputChange}
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
                value={formData.date}
                onChange={handleInputChange}
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
          <MdOutlinePostAdd className="h-5 w-5 text-indigo-400" />
          {updateLoading ? "loading..." : "Update Transaction"}
        </button>
      </form>
    </div>
  );
};
export default Transaction;
