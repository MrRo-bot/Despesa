import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { motion } from "motion/react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { nanoid } from "nanoid";

import { GET_TRANSACTIONS } from "../../graphql/queries/transaction.query";
import { InvestmentObjectType } from "../../types/types";
import DynamicIcon from "../DynamicIcon";
import { NumericFormat } from "react-number-format";
import dynamicCategoryColor from "../../utils/dynamicCategoryColor";

const Investments = () => {
  const [recentInvest, setRecentInvest] = useState<InvestmentObjectType[]>();
  const { data: transaction } = useQuery(GET_TRANSACTIONS);

  useEffect(() => {
    (async () => {
      const inv = await transaction?.transactions
        ?.filter((x: { account: string }) => x.account === "Investment")
        .slice(0, 3);
      setRecentInvest(inv);
    })();
  }, [transaction]);

  return (
    <SkeletonTheme
      duration={1}
      baseColor="rgba(220,220,220,0.2)"
      customHighlightBackground="linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255, 127, 144,0.25)15%, rgba(196, 153, 252,0.35)40%, rgba(255, 139, 152,0.45) 60%, rgba(255, 222, 148,0.25)85%, rgba(255,255,255,0.1) 100%)"
    >
      <div className="mt-14">
        <h3 className="mb-3 text-2xl tracking-tighter font-roboto text-zinc-900">
          My Investments
        </h3>
        <ul className="flex flex-col items-center justify-center gap-4">
          {!recentInvest?.length &&
            new Array(3).fill(0).map(() => (
              <motion.li
                key={nanoid()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.2,
                }}
                className="flex items-center justify-start w-full gap-6 px-5 py-3 shadow-main bg-zinc-50"
              >
                <Skeleton className="w-12 h-12 aspect-square" />

                <div className="flex justify-start w-full">
                  <div className="w-3/6">
                    <Skeleton className="max-w-1/2" />
                    <Skeleton className="max-w-1/3" />
                  </div>

                  <div className="w-2/6">
                    <Skeleton className="max-w-1/2" />
                    <Skeleton className="max-w-1/3" />
                  </div>

                  <div className="w-1/6">
                    <Skeleton className="max-w-1/2" />
                    <Skeleton className="max-w-1/3" />
                  </div>
                </div>
              </motion.li>
            ))}
          {recentInvest?.map((investment) => {
            const date = new Date(+investment?.date);
            return (
              <li
                key={investment._id}
                className="flex items-center justify-start w-full gap-6 px-5 py-3 shadow-main bg-zinc-50"
              >
                {investment.category && (
                  <div
                    className={`${dynamicCategoryColor(investment.category)} grid h-12 w-12 place-items-center p-1`}
                  >
                    {<DynamicIcon icon={investment.category} />}
                  </div>
                )}
                <div className="flex justify-start w-full">
                  {investment.description && (
                    <div className="w-3/6">
                      <h4 className="text-lg font-bold text-zinc-900">
                        {investment.description}
                      </h4>
                      <p className="tracking-tighter text-zinc-500">
                        {investment.location}
                      </p>
                    </div>
                  )}

                  {investment.amount && (
                    <div className="w-2/6">
                      <span className="flex gap-1 text-lg font-bold text-zinc-900">
                        <NumericFormat
                          value={investment.amount}
                          thousandSeparator
                          thousandsGroupStyle="lakh"
                          displayType="text"
                        />
                        ₹
                      </span>
                      <p className="tracking-tighter text-zinc-500">
                        Investment Value
                      </p>
                    </div>
                  )}
                  {date && (
                    <div className="w-1/6">
                      <h4 className="text-lg font-semibold text-zinc-900">
                        {date.toLocaleDateString()}
                      </h4>
                      <p className="tracking-tighter text-zinc-500">Date</p>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </SkeletonTheme>
  );
};

export default Investments;
