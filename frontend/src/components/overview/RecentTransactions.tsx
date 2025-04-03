import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { motion } from "motion/react";

import { GET_TRANSACTIONS } from "../../graphql/queries/transaction.query";

interface TransactionObjectType {
  __typename: string;
  _id: string;
  account: string;
  amount: number;
  date: string;
  description: string;
  location: string;
  paymentType: string;
}

const RecentTransactions = () => {
  const [recentItems, setRecentItems] = useState<{
    expenses: [TransactionObjectType];
    income: [TransactionObjectType];
  }>();
  const { data: transaction } = useQuery(GET_TRANSACTIONS);

  useEffect(() => {
    (async () => {
      const exp = await transaction?.transactions
        ?.filter((x: { account: string }) => x.account === "expense")
        .slice(0, 4);
      const inc = await transaction?.transactions
        ?.filter(
          (x: { account: string }) =>
            x.account === "saving" || x.account === "saving",
        )
        .slice(0, 4);
      setRecentItems({ expenses: exp, income: inc });
    })();
  }, [transaction]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.8,
      }}
      className="shadow-main bg-zinc-50 p-4"
    >
      <h3 className="font-roboto mb-2 text-2xl tracking-tighter text-zinc-900">
        Recent Transactions
      </h3>
      <div className="relative">
        <NavLink
          to="/transactions"
          className="absolute right-0 tracking-tighter text-zinc-700"
        >
          See all
        </NavLink>
        <div>
          <h4 className="my-3 text-lg font-bold text-zinc-900">Expenses</h4>
          <div className="flex flex-col gap-2">
            {recentItems?.expenses &&
              recentItems?.expenses.map((expense) => (
                <div
                  key={expense._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 bg-purple-400 p-3">
                      {/* <TbBrandSpotify className="h-8 w-8" /> */}
                    </div>
                    <div>
                      <h5 className="-my-1 line-clamp-1 text-lg font-semibold text-zinc-900">
                        {expense.description}
                      </h5>
                      <p className="text-sm tracking-tight text-zinc-500">
                        {expense.paymentType}
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-red-700">
                    -₹{expense.amount}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="mt-6">
          <h4 className="my-3 text-lg font-bold text-zinc-900">
            Income & Savings
          </h4>
          <div className="flex flex-col gap-2">
            {recentItems?.income &&
              recentItems?.income.map((inc) => (
                <div
                  key={inc._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-12 w-12 bg-green-400 p-3">
                      {/* <TbBrandSpotify className="h-8 w-8" /> */}
                    </div>
                    <div>
                      <h5 className="-my-1 text-lg font-semibold text-zinc-900">
                        {inc.description}
                      </h5>
                      <p className="text-sm tracking-tight text-zinc-500">
                        {inc.paymentType}
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-green-700">
                    +₹{inc.amount}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentTransactions;
