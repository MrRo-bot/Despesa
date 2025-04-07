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
      break;
    case "Social Life":
      return <FaUserFriends className="h-8 w-8" />;
      break;
    case "Self Development":
      return <FaHandshake className="h-8 w-8" />;
      break;
    case "Transportation":
      return <FaTaxi className="h-8 w-8" />;
      break;
    case "Culture":
      return <FaUserGroup className="h-8 w-8" />;
      break;
    case "Household":
      return <FaHouseChimneyUser className="h-8 w-8" />;
      break;
    case "Apparel":
      return <FaShirt className="h-8 w-8" />;
      break;
    case "Beauty":
      return <GiLipstick className="h-8 w-8" />;
      break;
    case "Sports":
      return <FaMedal className="h-8 w-8" />;
      break;
    case "Health":
      return <FaUserDoctor className="h-8 w-8" />;
      break;
    case "Education":
      return <FaSchool className="h-8 w-8" />;
      break;
    case "Gift":
      return <FaGift className="h-8 w-8" />;
      break;
    case "Electronics":
      return <FaBolt className="h-8 w-8" />;
      break;
    case "Other":
      return <FaEllipsis className="h-8 w-8" />;
      break;
    case "Bonus":
      return <FaMoneyCheckDollar className="h-8 w-8" />;
      break;
    case "Pocket Money":
      return <FaMoneyBill className="h-8 w-8" />;
      break;
    case "Salary":
      return <FaMoneyBills className="h-8 w-8" />;
      break;
    case "Profits":
      return <FaMoneyBillTrendUp className="h-8 w-8" />;
      break;
    case "Allowance":
      return <FaMoneyBillWave className="h-8 w-8" />;
      break;
    case "Petty Cash":
      return <FaRegMoneyBillAlt className="h-8 w-8" />;
      break;
  }
}
