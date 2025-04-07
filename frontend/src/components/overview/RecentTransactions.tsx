import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { motion } from "motion/react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { GET_TRANSACTIONS } from "../../graphql/queries/transaction.query";
import DynamicIcon from "../DynamicIcon";
import { TransactionObjectType } from "../../types/types";
import { TbPlus } from "react-icons/tb";
import { NumericFormat } from "react-number-format";

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
        .slice(0, 3);
      const inc = await transaction?.transactions
        ?.filter(
          (x: { account: string }) =>
            x.account === "Income" || x.account === "Saving",
        )
        .slice(0, 3);
      setRecentItems({ expenses: exp, income: inc });
    })();
  }, [transaction]);

  return (
    <SkeletonTheme
      baseColor="rgba(255,255,255,0.1)"
      customHighlightBackground="linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255, 127, 144,0.25)15%, rgba(196, 153, 252,0.35)40%, rgba(255, 139, 152,0.45) 60%, rgba(255, 222, 148,0.25)85%, rgba(255,255,255,0.1) 100%)"
    >
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
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.4,
          }}
          className="mt-7 mb-2 w-max bg-zinc-900 p-2 text-zinc-50"
        >
          <div className="flex items-center gap-3">
            <NavLink
              to="/transaction"
              className="aspect-square border-3 border-dashed border-zinc-50 p-1"
            >
              <TbPlus size={14} />
            </NavLink>
            <div className="font-roboto text-lg">Add Transaction</div>
          </div>
        </motion.div>
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
              {recentItems?.expenses ? (
                recentItems?.expenses.map((expense) => {
                  return (
                    <div
                      key={expense._id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="grid h-14 w-14 place-items-center bg-rose-500">
                          {<DynamicIcon icon={expense.category} />}
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
                      <div className="flex text-lg font-semibold text-red-700">
                        -₹
                        <NumericFormat
                          value={expense.amount}
                          thousandSeparator
                          thousandsGroupStyle="lakh"
                          displayType="text"
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <SkeletonList />
              )}
            </div>
          </div>
          <div className="mt-7">
            <h4 className="my-3 text-xl font-bold text-zinc-900">
              Income & Savings
            </h4>
            <div className="flex flex-col gap-2">
              {recentItems?.income ? (
                recentItems?.income.map((inc) => (
                  <div
                    key={inc._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="grid h-14 w-14 place-items-center bg-blue-500">
                        {<DynamicIcon icon={inc.category} />}
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
                    <div className="flex text-lg font-semibold text-green-700">
                      +₹
                      <NumericFormat
                        value={inc.amount}
                        thousandSeparator
                        thousandsGroupStyle="lakh"
                        displayType="text"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <SkeletonList />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </SkeletonTheme>
  );
};

const SkeletonList = () => {
  return Array(0)
    .fill(4)
    .map((_, i) => (
      <div key={i} className="flex items-center justify-between gap-2">
        <div className="flex items-center justify-start gap-2">
          <Skeleton style={{ width: 3 + "em", height: 3 + "em" }} />

          <div className="flex flex-col gap-2">
            <Skeleton style={{ width: 10 + "em", height: 1 + "em" }} />
            <Skeleton style={{ width: 7 + "em", height: 0.75 + "em" }} />
          </div>
        </div>
        <Skeleton
          style={{
            width: 3 + "em",
            height: 1 + "em",
          }}
        />
      </div>
    ));
};

export default RecentTransactions;
