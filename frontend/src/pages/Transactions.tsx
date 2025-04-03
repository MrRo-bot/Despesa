import { useQuery } from "@apollo/client";
import { Virtuoso } from "react-virtuoso";

import Card from "../components/transactions/Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

const Transactions = () => {
  const { data: transaction, loading: transactionLoading } =
    useQuery(GET_TRANSACTIONS);

  return (
    <div className="mx-auto w-[95%]">
      <div className="w-full px-10">
        <div className="flex h-[90vh] w-full flex-col pt-5 pb-1">
          <div className="font-roboto shadow-main mb-2 grid grid-cols-12 items-center rounded-md bg-violet-200 px-4 py-3 font-semibold text-zinc-900/80">
            <div className="col-span-3">Description</div>
            <div className="col-span-2">Payment</div>
            <div className="text-center">Amount</div>
            <div className="col-span-2 text-center">Account</div>
            <div className="">Location</div>
            <div className="col-span-2 text-center">Date</div>
            <div className="text-center">Actions</div>
          </div>
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
