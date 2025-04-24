import { useQuery } from "@apollo/client";
import { Virtuoso } from "react-virtuoso";
import { motion } from "motion/react";

import Card from "../components/transactions/Card";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { SetStateAction, useEffect, useState } from "react";
import { TransactionObjectType } from "../types/types";
import { BiSearchAlt } from "react-icons/bi";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const { data: transaction, loading: transactionLoading } =
    useQuery(GET_TRANSACTIONS);

  useEffect(() => {
    if (search === "") setFilteredTransactions(transaction?.transactions);
  }, [search, transaction?.transactions]);

  //search bar
  const handleSearch = (e: {
    currentTarget: { value: SetStateAction<string> };
  }) => {
    setSearch(e.currentTarget.value);

    if (search) {
      const filteredData = transaction.transactions.filter(
        (item: { [s: string]: unknown } | ArrayLike<unknown>) => {
          return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(search.toLowerCase());
        },
      );
      setFilteredTransactions(filteredData);
    }
  };

  return (
    <div className="mx-auto h-[90vh] w-[95%]">
      <div className="ml-auto w-[20%] py-4">
        <div className="shadow-main flex gap-2 rounded-full bg-zinc-50 px-2 py-1">
          <BiSearchAlt className="mt-0.5 h-7 w-7 text-zinc-800" />
          <input
            onChange={handleSearch}
            value={search}
            type="text"
            name="search"
            id="search"
            className="font-roboto mb-0.5 appearance-none text-zinc-800 focus:outline-none"
            placeholder="Search transaction..."
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 400, scale: 0.5 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="font-roboto shadow-main mb-4 flex items-center justify-start gap-5 rounded-full bg-violet-200 px-2 py-1 text-lg font-bold text-zinc-900/80"
      >
        <div className="w-[3.25%]"></div>
        <div className="w-[22%]">Description</div>
        <div className="w-[10.5%]">Payment</div>
        <div className="w-[8.6%] text-center">Amount</div>
        <div className="w-[8.8%] text-center">Account</div>
        <div className="w-[11.4%] text-center">Category</div>
        <div className="w-[8.8%] text-center">Date</div>
        <div className="w-[10.6%] text-center">Location</div>
        <div className="w-[5.25%]">Actions</div>
      </motion.div>

      <div className="flex h-[87.5%] w-full justify-between gap-5">
        {!transactionLoading && transaction?.transactions?.length > 0 && (
          <Virtuoso
            className="no-scrollbar h-full w-full"
            totalCount={filteredTransactions.length}
            data={filteredTransactions}
            itemContent={(_, t: TransactionObjectType) => (
              <Card key={t._id} transactionData={t} />
            )}
            components={{
              Footer: function Footer() {
                return (
                  <div className="text-center text-xl font-black text-zinc-600">
                    End of transactions
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
