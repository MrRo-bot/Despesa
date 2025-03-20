import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";

import { formatDate } from "../utils/formatDate";
import { useMutation } from "@apollo/client";
import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";

const categoryColorMap = {
  saving: "from-lime-700 to-green-400",
  expense: "from-pink-700 to-fuchsia-400",
  investment: "from-blue-700 to-cyan-400",
  income: "from-orange-700 to-amber-400",
};

const Card = ({
  transactionData,
  profilePicture,
}: {
  transactionData: {
    _id: string;
    description: string;
    paymentType: string;
    category: string;
    amount: number;
    location: string;
    date: string;
  };
  profilePicture: string;
}) => {
  const { description, paymentType, category, amount, location, date } =
    transactionData;

  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ["GetTransactions"],
  });

  const handleDelete = async () => {
    try {
      await deleteTransaction({
        variables: {
          transactionId: transactionData._id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const dateStr = formatDate(date);

  //@ts-expect-error //dont know why it has implicit any
  const cardClass = categoryColorMap[category];

  return (
    <div className={`rounded-md p-4 bg-gradient-to-b ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {category.toUpperCase()}
          </h2>
          <div className="flex items-center gap-2">
            {!loading && (
              <FaTrash onClick={handleDelete} className={"cursor-pointer"} />
            )}
            <Link to={`/transaction/${transactionData._id}`} viewTransition>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Transaction:{" "}
          {description.slice(0, 1).toUpperCase() + description.slice(1)}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          Payment Type:{" "}
          {paymentType.slice(0, 1).toUpperCase() + paymentType.slice(1)}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          Amount: {amount}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
          Payment Location:{" "}
          {location.slice(0, 1).toUpperCase() + location.slice(1)}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-zinc-50 font-bold">{dateStr}</p>
          <img
            referrerPolicy="no-referrer"
            src={profilePicture}
            className="grid place-items-centerh-8 w-8 border rounded-full"
            alt="U"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
