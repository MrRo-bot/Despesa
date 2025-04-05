import { useQuery } from "@apollo/client";
import { Virtuoso } from "react-virtuoso";
import { motion } from "motion/react";

import Card from "../components/transactions/Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

const Transactions = () => {
  const { data: transaction, loading: transactionLoading } =
    useQuery(GET_TRANSACTIONS);

  return (
    <div className="mx-auto w-[95%]">
      <div className="w-full">
        <div className="flex h-[90vh] w-full flex-col pt-5 pb-1">
          <motion.div
            initial={{ opacity: 0, x: 400, scale: 0.5 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="font-roboto shadow-main mb-2 grid grid-cols-14 items-center rounded-md bg-violet-200 px-4 py-3 font-semibold text-zinc-900/80"
          >
            <div className="col-span-3">Description</div>
            <div className="col-span-2">Payment</div>
            <div className="">Amount</div>
            <div className="col-span-2">Account</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-2">Date</div>
            <div className="">Location</div>
            <div className="text-center">Actions</div>
          </motion.div>
          {!transactionLoading && transaction?.transactions?.length > 0 && (
            <Virtuoso
              className="no-scrollbar"
              style={{ height: "100%" }}
              data={transaction?.transactions}
              itemContent={(_, transaction) => (
                <Card key={transaction._id} transactionData={transaction} />
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
