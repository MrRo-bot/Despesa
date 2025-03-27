import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";

import { formatDate } from "../../utils/formatDate";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../../graphql/mutations/transaction.mutation";
import { Bounce, toast } from "react-toastify";

const categoryColorMapText = {
  saving: "text-lime-600",
  expense: "text-rose-600",
  investment: "text-orange-600",
  income: "text-blue-600",
};

const categoryColorMapBg = {
  saving: "bg-lime-500",
  expense: "bg-rose-500",
  investment: "bg-orange-500",
  income: "bg-blue-500",
};

const Card = ({
  transactionData,
}: {
  transactionData: {
    _id: string;
    description: string;
    paymentType: string;
    account: string;
    amount: number;
    location: string;
    date: string;
  };
}) => {
  const { description, paymentType, amount, account, location, date } =
    transactionData;

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
    <div className="mt-2 mr-2 grid grid-cols-12 items-center rounded-md bg-zinc-50 p-4 text-lg">
      <div className="has-tooltip relative col-span-3 pr-2 font-bold">
        <span className="tooltip w-max rounded border bg-zinc-100 p-1 text-sm text-zinc-900 shadow-lg transition-all ease-in-out">
          {description.slice(0, 1).toUpperCase() + description.slice(1)}
        </span>
        <p className="line-clamp-1 text-zinc-900">
          {description.slice(0, 1).toUpperCase() + description.slice(1)}
        </p>
      </div>

      <p className="col-span-2 line-clamp-1 font-semibold text-zinc-500">
        {paymentType.slice(0, 1).toUpperCase() + paymentType.slice(1)}
      </p>

      <p
        className={`font-roboto mx-auto line-clamp-1 w-max rounded-md px-1 text-white ${cardClassBg}`}
      >
        {amount}
      </p>

      <p
        className={`col-span-2 line-clamp-1 text-center ${cardClassText} font-bold`}
      >
        {account[0].toUpperCase() + account.slice(1)}
      </p>

      <p className="line-clamp-1 font-semibold text-zinc-500">
        {location.slice(0, 1).toUpperCase() + location.slice(1)}
      </p>

      <p className="font-roboto col-span-2 line-clamp-1 text-center text-sm font-semibold text-zinc-700">
        {dateStr}
      </p>

      <div className="flex items-center justify-center gap-2">
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
  );
};

export default Card;
