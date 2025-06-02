import {
  FaUserFriends,
  FaHandshake,
  FaTaxi,
  FaMedal,
  FaSchool,
  FaGift,
  FaBolt,
  FaMoneyBill,
  FaMoneyBillWave,
  FaRegMoneyBillAlt,
  FaQuestion,
} from "react-icons/fa";
import {
  FaMoneyBills,
  FaBowlFood,
  FaUserGroup,
  FaHouseChimneyUser,
  FaShirt,
  FaUserDoctor,
  FaEllipsis,
  FaMoneyCheckDollar,
  FaMoneyBillTrendUp,
} from "react-icons/fa6";
import { GiLipstick } from "react-icons/gi";

export default function DynamicIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "Food":
      return <FaBowlFood className="h-full w-full" />;
    case "Social Life":
      return <FaUserFriends className="h-full w-full" />;
    case "Self Development":
      return <FaHandshake className="h-full w-full" />;
    case "Transportation":
      return <FaTaxi className="h-full w-full" />;
    case "Culture":
      return <FaUserGroup className="h-full w-full" />;
    case "Household":
      return <FaHouseChimneyUser className="h-full w-full" />;
    case "Apparel":
      return <FaShirt className="h-full w-full" />;
    case "Beauty":
      return <GiLipstick className="h-full w-full" />;
    case "Sports":
      return <FaMedal className="h-full w-full" />;
    case "Health":
      return <FaUserDoctor className="h-full w-full" />;
    case "Education":
      return <FaSchool className="h-full w-full" />;
    case "Gift":
      return <FaGift className="h-full w-full" />;
    case "Electronics":
      return <FaBolt className="h-full w-full" />;
    case "Other":
      return <FaEllipsis className="h-full w-full" />;
    case "Bonus":
      return <FaMoneyCheckDollar className="h-full w-full" />;
    case "Pocket Money":
      return <FaMoneyBill className="h-full w-full" />;
    case "Salary":
      return <FaMoneyBills className="h-full w-full" />;
    case "Profits":
      return <FaMoneyBillTrendUp className="h-full w-full" />;
    case "Allowance":
      return <FaMoneyBillWave className="h-full w-full" />;
    case "Petty Cash":
      return <FaRegMoneyBillAlt className="h-full w-full" />;
    default:
      return <FaQuestion className="h-full w-full" />;
  }
}
