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
      return <FaBowlFood className="h-8 w-8" />;
    case "Social Life":
      return <FaUserFriends className="h-8 w-8" />;
    case "Self Development":
      return <FaHandshake className="h-8 w-8" />;
    case "Transportation":
      return <FaTaxi className="h-8 w-8" />;
    case "Culture":
      return <FaUserGroup className="h-8 w-8" />;
    case "Household":
      return <FaHouseChimneyUser className="h-8 w-8" />;
    case "Apparel":
      return <FaShirt className="h-8 w-8" />;
    case "Beauty":
      return <GiLipstick className="h-8 w-8" />;
    case "Sports":
      return <FaMedal className="h-8 w-8" />;
    case "Health":
      return <FaUserDoctor className="h-8 w-8" />;
    case "Education":
      return <FaSchool className="h-8 w-8" />;
    case "Gift":
      return <FaGift className="h-8 w-8" />;
    case "Electronics":
      return <FaBolt className="h-8 w-8" />;
    case "Other":
      return <FaEllipsis className="h-8 w-8" />;
    case "Bonus":
      return <FaMoneyCheckDollar className="h-8 w-8" />;
    case "Pocket Money":
      return <FaMoneyBill className="h-8 w-8" />;
    case "Salary":
      return <FaMoneyBills className="h-8 w-8" />;
    case "Profits":
      return <FaMoneyBillTrendUp className="h-8 w-8" />;
    case "Allowance":
      return <FaMoneyBillWave className="h-8 w-8" />;
    case "Petty Cash":
      return <FaRegMoneyBillAlt className="h-8 w-8" />;
    default:
      return <FaQuestion className="h-8 w-8" />;
  }
}
