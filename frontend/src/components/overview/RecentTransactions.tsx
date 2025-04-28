import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { motion } from "motion/react";
import { NumericFormat } from "react-number-format";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { GET_TRANSACTIONS } from "../../graphql/queries/transaction.query";
import DynamicIcon from "../DynamicIcon";
import { TransactionObjectType } from "../../types/types";
import dynamicCategoryColor from "../../utils/dynamicCategoryColor";

const RecentTransactions = () => {
  const [recentItems, setRecentItems] = useState<{
    expenses: [TransactionObjectType];
    income: [TransactionObjectType];
  }>();
  const { data: transaction } = useQuery(GET_TRANSACTIONS);

  useEffect(() => {
    (async () => {
      const exp = await transaction?.transactions
        ?.filter((x: { account: string }) => x.account === "Expense")
        .slice(0, 6);
      const inc = await transaction?.transactions
        ?.filter(
          (x: { account: string }) =>
            x.account === "Income" || x.account === "Saving",
        )
        .slice(0, 6);
      setRecentItems({ expenses: exp, income: inc });
    })();
  }, [transaction]);

  return (
    <SkeletonTheme
      duration={1}
      baseColor="rgba(220,220,220,0.2)"
      customHighlightBackground="linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255, 127, 144,0.25)15%, rgba(196, 153, 252,0.35)40%, rgba(255, 139, 152,0.45) 60%, rgba(255, 222, 148,0.25)85%, rgba(255,255,255,0.1) 100%)"
    >
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.2,
        }}
        className="shadow-main bg-zinc-50 px-6 py-3"
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
            <h4 className="my-3 text-xl font-bold text-zinc-900">Expenses</h4>
            <div className="flex flex-col gap-2">
              {!recentItems?.expenses?.length &&
                new Array(6).fill(0).map((_, i) => (
                  <>
                    <motion.li
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: 0.2,
                      }}
                      className="flex items-center justify-between gap-4"
                    >
                      <Skeleton className="aspect-square h-11 w-11" />

                      <div className="flex w-full justify-between">
                        <div className="w-5/6">
                          <Skeleton className="max-w-4/6" />
                          <Skeleton className="max-w-1/3" />
                        </div>
                        <div className="my-auto w-1/6">
                          <Skeleton />
                        </div>
                      </div>
                    </motion.li>
                  </>
                ))}

              {recentItems?.expenses?.map((expense) => (
                <div
                  key={expense._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {expense.category && (
                      <div
                        className={`${dynamicCategoryColor(expense.category)} grid h-12 w-12 place-items-center`}
                      >
                        {<DynamicIcon icon={expense.category} />}
                      </div>
                    )}
                    {expense.description && (
                      <div>
                        <h5 className="-my-1 line-clamp-1 text-lg font-semibold text-zinc-900">
                          {expense.description}
                        </h5>
                        <p className="text-sm tracking-tight text-zinc-500">
                          {expense.paymentType}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex text-lg font-semibold text-red-700">
                    -₹
                    {expense.amount && (
                      <NumericFormat
                        value={expense.amount}
                        thousandSeparator
                        thousandsGroupStyle="lakh"
                        displayType="text"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-7">
            <h4 className="my-3 text-xl font-bold text-zinc-900">
              Income & Savings
            </h4>
            <div className="flex flex-col gap-2">
              {!recentItems?.income?.length &&
                new Array(6).fill(0).map((_, i) => (
                  <>
                    <motion.li
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: 0.2,
                      }}
                      className="flex items-center justify-between gap-4"
                    >
                      <Skeleton className="aspect-square h-11 w-11" />

                      <div className="flex w-full justify-between">
                        <div className="w-5/6">
                          <Skeleton className="max-w-4/6" />
                          <Skeleton className="max-w-1/3" />
                        </div>
                        <div className="my-auto w-1/6">
                          <Skeleton />
                        </div>
                      </div>
                    </motion.li>
                  </>
                ))}
              {recentItems?.income?.map((inc) => (
                <div
                  key={inc._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {inc.category && (
                      <div
                        className={`grid h-12 w-12 place-items-center ${dynamicCategoryColor(inc.category)}`}
                      >
                        {<DynamicIcon icon={inc.category} />}
                      </div>
                    )}
                    {inc.description && (
                      <div>
                        <h5 className="-my-1 line-clamp-1 text-lg font-semibold text-zinc-900">
                          {inc.description}
                        </h5>
                        <p className="text-sm tracking-tight text-zinc-500">
                          {inc.paymentType}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex text-lg font-semibold text-green-700">
                    +₹
                    {inc.amount && (
                      <NumericFormat
                        value={inc.amount}
                        thousandSeparator
                        thousandsGroupStyle="lakh"
                        displayType="text"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </SkeletonTheme>
  );
};

export default RecentTransactions;
