import mongoose from "mongoose";

import {
  paymentType,
  income,
  expenses,
  account,
} from "../../../frontend/src/utils/constants.js";

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
    enum: paymentType,
    required: true,
  },
  account: {
    type: String,
    enum: account,
    required: true,
  },
  category: {
    type: String,
    enum: [...income, ...expenses],
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
