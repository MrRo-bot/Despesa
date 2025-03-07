import { Context } from "vm";
import Transaction from "../models/transaction.model";

const transactionResolver = {
  Query: {
    transactions: async (_: any, __: any, context: any) => {
      try {
        const user = context.getUser();
        if (!user) throw new Error("Unauthorized");

        const userId = await user._id;
        const transactions = await Transaction.find({ userId });
        return transactions;
      } catch (error: any) {
        console.error(`Error getting transactions: ${error}`);
        throw new Error(error.message || `Error getting transactions`);
      }
    },

    transaction: async (_: any, { transactionId }: any, context: any) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        return transaction;
      } catch (error: any) {
        console.error(`Error getting transaction: ${error}`);
        throw new Error(error.message || `Error getting transaction`);
      }
    },
  },
  Mutation: {
    createTransaction: async (_: any, { input }: any, context: any) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error: any) {
        console.error(`Error creating new transaction: ${error}`);
        throw new Error(error.message || `Error creating new transaction`);
      }
    },
    updateTransaction: async (_: any, { input }: any) => {
      try {
        const updatedTransaction = Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (error: any) {
        console.error(`Error updating transaction: ${error}`);
        throw new Error(error.message || `Error updating transaction`);
      }
    },
    deleteTransaction: async (_: any, { transactionId }: any) => {
      try {
        const deletedTransaction = Transaction.findByIdAndDelete(transactionId);
        return deletedTransaction;
      } catch (error: any) {
        console.error(`Error deleting transaction: ${error}`);
        throw new Error(error.message || `Error deleting transaction`);
      }
    },
  },
};

export default transactionResolver;
