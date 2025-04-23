import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { motion } from "motion/react";

import formatDate from "../../utils/formatDate";
import { DELETE_TRANSACTION } from "../../graphql/mutations/transaction.mutation";
import { NumericFormat } from "react-number-format";
import dynamicCategoryColor from "../../utils/dynamicCategoryColor";
import DynamicIcon from "../DynamicIcon";

const accountColorMap = {
  Saving: "text-green-800",
  Expense: "text-red-800",
  Investment: "text-orange-800",
  Income: "text-blue-800",
};

const accountColorBgMap = {
  Saving: "bg-green-500/10",
  Expense: "bg-rose-500/10",
  Investment: "bg-orange-500/10",
  Income: "bg-blue-500/10",
};

const Card = ({
  transactionData,
}: {
  transactionData: {
    _id: string;
    description: string;
    paymentType: string;
    account: string;
    category: string;
    amount: number;
    location: string;
    date: string;
  };
}) => {
  const {
    description,
    paymentType,
    amount,
    account,
    category,
    location,
    date,
  } = transactionData;

  const [deleteTransaction, { loading: delLoading }] = useMutation(
    DELETE_TRANSACTION,
    {
      refetchQueries: ["GetTransactions"],
    },
  );

  const handleDelete = async () => {
    try {
      await deleteTransaction({
        variables: {
          transactionId: transactionData._id,
        },
      });
      toast(`❌👋 POOF!! Gone`, {
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

  const dateStr = formatDate(date);

  //@ts-expect-error don't know why it cant recognize
  const cardClassBg = accountColorBgMap[account];

  //@ts-expect-error don't know why it cant recognize
  const cardClassText = accountColorMap[account];

  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3, type: "tween" }}
      className="mt-4 flex items-center justify-start gap-5 rounded-full bg-zinc-50 px-6 py-3 text-lg"
    >
      <div
        className={`${dynamicCategoryColor(category)} grid aspect-square h-12 w-12 place-items-center rounded-full p-2`}
      >
        {<DynamicIcon icon={category} />}
      </div>

      <div className="line-clamp-1 w-[25%] text-2xl font-bold text-stone-800">
        {description.slice(0, 1).toUpperCase() + description.slice(1)}
      </div>

      <div className="w-[12%]">
        <div className="text-zinc-500">
          {paymentType.slice(0, 1).toUpperCase() + paymentType.slice(1)}
        </div>
      </div>

      <div className="w-[10%]">
        <span
          className={`font-roboto flex w-max gap-1 rounded-full bg-slate-100 px-4 py-1.5 ${cardClassText} font-medium`}
        >
          ₹
          <NumericFormat
            value={amount}
            thousandSeparator
            thousandsGroupStyle="lakh"
            displayType="text"
          />
        </span>
      </div>

      <div className="line-clamp-1 w-[10%]">
        <div
          className={`${cardClassText} ${cardClassBg} w-max rounded-full px-2 py-1 text-base font-semibold`}
        >
          {account[0].toUpperCase() + account.slice(1)}
        </div>
      </div>

      <div className="w-[13%]">
        <div
          className={`w-max rounded-full bg-purple-400/20 px-2 py-1 text-base font-semibold text-purple-800`}
        >
          {category[0].toUpperCase() + category.slice(1)}
        </div>
      </div>

      <div className="font-roboto line-clamp-1 flex w-[10%] items-baseline gap-2 text-base font-medium text-slate-600">
        {dateStr}
      </div>

      <div className="text-medium line-clamp-1 w-[12%] px-2 py-1 font-semibold text-slate-800">
        {location.slice(0, 1).toUpperCase() + location.slice(1)}
      </div>

      <div className="flex w-[6%] items-center justify-center gap-2">
        {!delLoading && (
          <FaTrash
            onClick={handleDelete}
            className={"cursor-pointer text-rose-500"}
          />
        )}
        <Link to={`/transaction/${transactionData._id}`}>
          <HiPencilAlt className="cursor-pointer text-yellow-600" size={20} />
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;
