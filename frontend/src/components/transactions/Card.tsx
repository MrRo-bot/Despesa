import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { motion } from "motion/react";

import { formatDate } from "../../utils/formatDate";
import { DELETE_TRANSACTION } from "../../graphql/mutations/transaction.mutation";
import { NumericFormat } from "react-number-format";

const categoryColorMapText = {
  Saving: "text-lime-800",
  Expense: "text-red-800",
  Investment: "text-orange-800",
  Income: "text-blue-800",
};

const categoryColorMapBg = {
  Saving: "bg-lime-500/20",
  Expense: "bg-rose-500/20",
  Investment: "bg-orange-500/20",
  Income: "bg-blue-500/20",
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

  //@ts-expect-error dont know why it cant recognize
  const cardClassBg = categoryColorMapBg[account];

  //@ts-expect-error dont know why it cant recognize
  const cardClassText = categoryColorMapText[account];

  return (
    <motion.div
      initial={{ opacity: 0, x: -400, scale: 0.5 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 200, scale: 1.2 }}
      transition={{ duration: 0.4, type: "tween" }}
      className="mb-5 grid grid-cols-6 items-center gap-2 rounded-md bg-zinc-50 p-4 text-lg"
    >
      <div className="col-start-1 col-end-5">
        <div className="font-roboto line-clamp-1 flex items-end gap-2">
          <strong className="text-xl text-slate-600">
            {dateStr.slice(0, -6)}
          </strong>
          <strong className="text-sm text-zinc-400">{dateStr.slice(-4)}</strong>
        </div>
        <div className="pt-2 pb-4 font-bold">
          <div className="line-clamp-1 text-2xl text-stone-800">
            {description.slice(0, 1).toUpperCase() + description.slice(1)}
          </div>
        </div>
        <div className="flex justify-start gap-2">
          <div
            className={`line-clamp-1 ${cardClassText} ${cardClassBg} border-2 border-${cardClassBg.slice(3, -3)} rounded-full px-3 py-0.5 text-base font-bold`}
          >
            {account[0].toUpperCase() + account.slice(1)}
          </div>

          <div
            className={`line-clamp-1 rounded-full border-2 border-purple-800 bg-purple-400/20 px-3 py-0.5 text-base font-bold text-purple-800`}
          >
            {category[0].toUpperCase() + category.slice(1)}
          </div>

          <div className="line-clamp-1 rounded-full border-2 border-slate-400 bg-slate-400/20 px-3 py-0.5 text-base font-bold text-slate-800">
            {location.slice(0, 1).toUpperCase() + location.slice(1)}
          </div>
        </div>
      </div>
      <div className="col-start-5 col-end-7 flex h-full flex-col items-end justify-start">
        <NumericFormat
          value={amount}
          thousandSeparator
          thousandsGroupStyle="lakh"
          displayType="text"
          className={`font-roboto line-clamp-1 w-1/2 rounded-full p-1 text-center ${cardClassBg} font-bold ${cardClassText} `}
        />
        <div className="mt-2 line-clamp-1 font-semibold text-zinc-500">
          {paymentType.slice(0, 1).toUpperCase() + paymentType.slice(1)}
        </div>
        <div className="mt-auto flex items-center justify-center gap-2">
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
      </div>
    </motion.div>
  );
};

export default Card;
