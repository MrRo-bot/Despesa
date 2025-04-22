const dynamicCategoryColor = (iconColor: string) => {
  switch (iconColor) {
    case "Food":
      return "bg-red-600";
    case "Social Life":
      return "bg-cyan-600";
    case "Self Development":
      return "bg-violet-400";
    case "Transportation":
      return "bg-slate-950";
    case "Culture":
      return "bg-blue-600";
    case "Household":
      return "bg-violet-700";
    case "Apparel":
      return "bg-emerald-500";
    case "Beauty":
      return "bg-fuchsia-600";
    case "Sports":
      return "bg-teal-500";
    case "Health":
      return "bg-green-600";
    case "Education":
      return "bg-green-800";
    case "Gift":
      return "bg-amber-600";
    case "Electronics":
      return "bg-red-900";
    case "Other":
      return "bg-slate-400";
    case "Bonus":
      return "bg-amber-700";
    case "Pocket Money":
      return "bg-purple-400";
    case "Salary":
      return "bg-yellow-600";
    case "Profits":
      return "bg-teal-500";
    case "Allowance":
      return "bg-rose-500";
    case "Petty Cash":
      return "bg-emerald-800";
    default:
      return "bg-slate-700";
  }
};

export default dynamicCategoryColor;
