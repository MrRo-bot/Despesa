import { useEffect, useState } from "react";
import { GET_TRANSACTIONS } from "../../graphql/queries/transaction.query";
import { useQuery } from "@apollo/client";
import { motion } from "motion/react";
import { InvestmentObjectType } from "../../types/types";
import DynamicIcon from "../DynamicIcon";
import { NumericFormat } from "react-number-format";
import dynamicCategoryColor from "../../utils/dynamicCategoryColor";

const Investments = () => {
  const [recentInvest, setRecentInvest] = useState<[InvestmentObjectType]>();
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
    <div className="mt-14">
      <h3 className="font-roboto mb-3 text-2xl tracking-tighter text-zinc-900">
        My Investments
      </h3>
      <ul className="flex flex-col items-center justify-center gap-2">
        {recentInvest?.map((investment) => {
          const date = new Date(+investment?.date);
          return (
            <motion.li
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
              }}
              key={investment._id}
              className="shadow-main flex w-full items-center justify-start gap-6 bg-zinc-50 px-5 py-3"
            >
              {investment.category && (
                <div
                  className={`${dynamicCategoryColor(investment.category)} grid h-12 w-12 place-items-center p-1`}
                >
                  {<DynamicIcon icon={investment.category} />}
                </div>
              )}
              <div className="flex w-full justify-start">
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
                    <NumericFormat
                      value={investment.amount}
                      thousandSeparator
                      thousandsGroupStyle="lakh"
                      displayType="text"
                      className="text-lg font-bold text-zinc-900"
                    />
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
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default Investments;
