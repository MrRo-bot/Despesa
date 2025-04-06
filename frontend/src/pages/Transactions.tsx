import { useQuery } from "@apollo/client";
import { Virtuoso } from "react-virtuoso";

import Card from "../components/transactions/Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

const Transactions = () => {
  const { data: transaction, loading: transactionLoading } =
    useQuery(GET_TRANSACTIONS);

  return (
    <div className="mx-auto w-[95%]">
      {/* <motion.div
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
          </motion.div> */}
      <div className="flex h-[90vh] w-full justify-between gap-5 pt-5 pb-1">
        {!transactionLoading && transaction?.transactions?.length > 0 && (
          <Virtuoso
            className="no-scrollbar"
            style={{ height: "100%", width: "100%" }}
            data={transaction?.transactions}
            itemContent={(_, transaction) => (
              <Card key={transaction._id} transactionData={transaction} />
            )}
            components={{
              Footer: function Footer() {
                return (
                  <div className="text-center text-xl font-black text-zinc-600">
                    {" "}
                    End of transactions{" "}
                  </div>
                );
              },
            }}
          />
        )}
        <div className="w-[50%] border-6 border-dashed border-zinc-900 text-zinc-900">
          Edit Transaction Pane
        </div>
      </div>
    </div>
  );
};

export default Transactions;
