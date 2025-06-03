import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useQuery } from "@apollo/client";
import { Virtuoso } from "react-virtuoso";

import { BiSearchAlt } from "react-icons/bi";

import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

import Card from "../components/transactions/Card";
import SortBy from "../components/transactions/SortBy";
import OrderBy from "../components/transactions/OrderBy";
import formatDate from "../utils/formatDate";

import { TransactionObjectType } from "../types/types";

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
        (item: { [s: string]: string } | ArrayLike<string>) => {
          const finalItems = [
            ...Object.values(item).slice(0, -1),
            formatDate(Object.values(item)[Object.values(item).length - 1]),
          ];
          return finalItems
            .join("")
            .toLowerCase()
            .includes(search.toLowerCase());
        },
      );
      setFilteredTransactions(
        filteredData.sort((a: { date: string }, b: { date: string }) =>
          b.date.localeCompare(a.date),
        ),
      );
    }
  }, [search, transaction?.transactions]);

  //sort and order
  useEffect(() => {
    if (sortBy === "" && orderBy === "") {
      const copy = [...transaction.transactions];
      setFilteredTransactions(
        copy?.sort((a: { date: string }, b: { date: string }) =>
          b.date.localeCompare(a.date),
        ),
      );
    } else {
      //@ts-expect-error: x and y are TransactionObjectType
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
    <div className="mx-auto h-full w-[95%]">
      <div className="flex flex-col items-center gap-2 pt-4 pb-5 sm:mx-auto sm:max-w-5/6 sm:px-2 md:gap-4 lg:max-w-10/12 lg:flex-row-reverse lg:justify-between lg:gap-0 xl:max-w-8/12 2xl:max-w-7/12">
        <motion.div
          initial={{ opacity: 0, y: -400, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="shadow-main flex w-full gap-2 rounded-full bg-zinc-50 px-2 py-1 transition-colors duration-100 ease-in-out hover:bg-purple-100 focus:bg-purple-100"
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
        <motion.div
          initial={{ opacity: 0, y: -400, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex w-full items-center justify-between sm:justify-evenly lg:justify-normal lg:gap-4"
        >
          <SortBy sortBy={sortBy} setSortBy={setSortBy} />
          <OrderBy orderBy={orderBy} setOrderBy={setOrderBy} />
        </motion.div>
      </div>

      <div className="mx-auto flex h-[90%] w-full justify-between gap-5 sm:max-w-5/6">
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
