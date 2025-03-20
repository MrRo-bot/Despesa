import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  MdOutlineCurrencyRupee,
  MdOutlinePayment,
  MdOutlinePostAdd,
  MdOutlineShareLocation,
} from "react-icons/md";
import { TbCalendar, TbCategory, TbTransactionRupee } from "react-icons/tb";
import { UPDATE_TRANSACTION } from "../graphql/mutations/transaction.mutation";
import { useParams } from "react-router-dom";
import { GET_TRANSACTION } from "../graphql/queries/transaction.query";

const Transaction = () => {
  const { id } = useParams();

  const { data } = useQuery(GET_TRANSACTION, {
    variables: { id: id },
  });

  console.log(id, data);

  const [updateTransaction, { loading: updateLoading }] =
    useMutation(UPDATE_TRANSACTION);

  const [formData, setFormData] = useState({
    description: data?.transaction?.description || "",
    paymentType: data?.transaction?.paymentType || "",
    category: data?.transaction?.category || "",
    amount: data?.transaction?.amount || "",
    location: data?.transaction?.location || "",
    date: data?.transaction?.date || "",
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
    } catch (error) {
      console.error(error);
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
    if (data) {
      setFormData({
        description: data?.transaction?.description,
        paymentType: data?.transaction?.paymentType,
        category: data?.transaction?.category,
        amount: data?.transaction?.amount,
        location: data?.transaction?.location,
        date: new Date(+data.transaction.date).toISOString().substring(0, 10),
      });
    }
  }, [data]);

  // if (loading) return <TransactionFormSkeleton />; loading var comes from GET_TRANSACTION

  return (
    <div className="h-screen max-w-4xl mx-auto flex flex-col items-center">
      <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
        Update this transaction
      </p>
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
                  value={formData.description}
                  onChange={handleInputChange}
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
                  value={formData.location}
                  onChange={handleInputChange}
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
                <select
                  defaultValue={formData.category}
                  onChange={handleInputChange}
                  name="category"
                  className="select h-12 tracking-wider "
                >
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
                value={formData.date}
                onChange={handleInputChange}
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
                  defaultValue={formData.paymentType}
                  onChange={handleInputChange}
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
          {updateLoading ? "loading..." : "Update Transaction"}
        </button>
      </form>
    </div>
  );
};
export default Transaction;
