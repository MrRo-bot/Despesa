export const account = ["Saving", "Income", "Expense", "Investment"];

export const paymentType = ["Mobile Banking", "Cash", "Card"];

export const income = [
  "Bonus",
  "Pocket Money",
  "Salary",
  "Profits",
  "Allowance",
  "Petty Cash",
];

export const expenses = [
  "Food",
  "Social Life",
  "Self Development",
  "Transportation",
  "Household",
  "Apparel",
  "Beauty",
  "Sports",
  "Health",
  "Culture",
  "Education",
  "Gift",
  "Electronics",
  "Other",
];

export const accountColorMap: Record<string, string> = {
  Saving: "text-green-800",
  Expense: "text-red-800",
  Investment: "text-orange-800",
  Income: "text-blue-800",
};

export const accountColorBgMap: Record<string, string> = {
  Saving: "bg-green-500/10",
  Expense: "bg-rose-500/10",
  Investment: "bg-orange-500/10",
  Income: "bg-blue-500/10",
};
