import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Virtuoso } from "react-virtuoso";
import { motion } from "motion/react";
import { BiSearchAlt } from "react-icons/bi";

import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { TransactionObjectType } from "../types/types";
import Card from "../components/transactions/Card";
import SortBy from "../components/transactions/SortBy";
import OrderBy from "../components/transactions/OrderBy";

const Transactions = () => {
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("");
  const [filteredTransactions, setFilteredTransactions] = useState<
    TransactionObjectType[]
  >([]);

  const { data: transaction, loading: transactionLoading } =
    useQuery(GET_TRANSACTIONS);

  //search bar
  useEffect(() => {
    if (search === "") setFilteredTransactions(transaction?.transactions);

    if (search) {
      const filteredData = transaction?.transactions?.filter(
        (item: { [s: string]: unknown } | ArrayLike<unknown>) => {
          return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(search.toLowerCase());
        },
      );
      setFilteredTransactions(filteredData);
    }
  }, [search, transaction?.transactions]);

  //sort and order
  useEffect(() => {
    if (sortBy === "" || orderBy === "") {
      setFilteredTransactions(transaction?.transactions);
    } else {
      //@ts-expect-error: i know x and y are transaction object
      const finalSorted = transaction?.transactions?.toSorted((x, y) => {
        const a = x[sortBy];
        const b = y[sortBy];
        if (orderBy === "ascending") {
          return typeof a === "number" ? a - b : a.localeCompare(b);
        }
        if (orderBy === "descending") {
          return typeof b === "number" ? b - a : b.localeCompare(a);
        }
      });
      setFilteredTransactions(finalSorted);
    }
  }, [transaction?.transactions, sortBy, orderBy]);

  return (
    <div className="mx-auto h-[90vh] w-[95%]">
      <div className="flex items-center pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -400, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex items-center gap-4"
        >
          <SortBy sortBy={sortBy} setSortBy={setSortBy} />
          <OrderBy orderBy={orderBy} setOrderBy={setOrderBy} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -400, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="shadow-main ml-auto flex w-[24%] gap-2 rounded-full bg-zinc-50 px-2 py-1 transition-colors duration-100 ease-in-out hover:bg-purple-100 focus:bg-purple-100"
        >
          <BiSearchAlt className="mt-0.5 h-7 w-7 text-zinc-800" />
          <input
            onChange={(e) => setSearch(e.currentTarget.value)}
            value={search}
            type="text"
            name="search"
            id="search"
            className="font-roboto mb-0.5 w-full appearance-none text-zinc-800 focus:outline-none"
            placeholder="Search transactions..."
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 400, scale: 0.5 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="font-roboto shadow-main mb-4 flex items-center justify-start gap-5 rounded-full bg-violet-200 px-2 py-1 text-lg font-bold text-zinc-900/80"
      >
        <div className="w-[3.25%]">Icon</div>
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
        {transactionLoading && (
          <div className="h-10 w-10 animate-spin rounded-full border-8 border-b-fuchsia-950"></div>
        )}
        {transaction?.transactions?.length === 0 && (
          <div className="mx-auto text-xl font-black text-zinc-600">
            No transactions found
          </div>
        )}
        {!transactionLoading && transaction?.transactions?.length > 0 && (
          <Virtuoso
            className="no-scrollbar h-full w-full"
            totalCount={filteredTransactions?.length}
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
