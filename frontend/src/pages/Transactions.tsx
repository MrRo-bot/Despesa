import { useQuery } from "@apollo/client";
import { Virtuoso } from "react-virtuoso";

import Card from "../components/transactions/Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

const Transactions = () => {
  const { data: transaction, loading: transactionLoading } =
    useQuery(GET_TRANSACTIONS);

  return (
    <div className="mx-auto w-[95%]">
      <div
        // initial={{ opacity: 0, x: 400, scale: 0.5 }}
        // animate={{ opacity: 1, x: 0, scale: 1 }}
        // transition={{ duration: 0.6, type: "spring" }}
        className="font-roboto shadow-main flex items-center justify-start gap-5 rounded-full bg-violet-200 px-6 py-3 text-lg font-bold text-zinc-900/80"
      >
        <div className="w-[3.5%]"></div>
        <div className="w-[25%]">Description</div>
        <div className="w-[12%]">Payment</div>
        <div className="w-[10%]">Amount</div>
        <div className="w-[10%]">Account</div>
        <div className="w-[13%]">Category</div>
        <div className="w-[10%]">Date</div>
        <div className="w-[12%]">Location</div>
        <div className="w-[6%]">Actions</div>
      </div>
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
                  <div className="mt-4 text-center text-xl font-black text-zinc-600">
                    {" "}
                    End of transactions{" "}
                  </div>
                );
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Transactions;
