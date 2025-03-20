import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";

import { formatDate } from "../utils/formatDate";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
  income: "from-orange-700 to-orange-400",
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

  const dateStr = formatDate(date);

  //@ts-expect-error //dont know why it has implicit any
  const cardClass = categoryColorMap[category];

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {category.toUpperCase()}
          </h2>
          <div className="flex items-center gap-2">
            <FaTrash className={"cursor-pointer"} />
            <Link to={`/transaction/123`} viewTransition>
              <HiPencilAlt className="cursor-pointer" size={20} />
            </Link>
          </div>
        </div>
        <p className="text-white flex items-center gap-1">
          <BsCardText />
          {description.slice(0, 1).toUpperCase() + description.slice(1)}
        </p>
        <p className="text-white flex items-center gap-1">
          <MdOutlinePayments />
          {paymentType.slice(0, 1).toUpperCase() + paymentType.slice(1)}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaSackDollar />
          {amount}
        </p>
        <p className="text-white flex items-center gap-1">
          <FaLocationDot />
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
