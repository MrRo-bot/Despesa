import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["Mobile Banking", "Cash", "Card"],
    required: true,
  },
  account: {
    type: String,
    enum: ["Saving", "Income", "Expense", "Investment"],
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Bonus",
      "Pocket Money",
      "Salary",
      "Profits",
      "Allowance",
      "Petty Cash",
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
    ],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    default: "Unknown",
  },
  date: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
