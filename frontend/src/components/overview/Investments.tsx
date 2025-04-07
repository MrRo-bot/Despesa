import { useEffect, useState } from "react";
import { GET_TRANSACTIONS } from "../../graphql/queries/transaction.query";
import { useQuery } from "@apollo/client";
import { motion } from "motion/react";
import { InvestmentObjectType } from "../../types/types";
import DynamicIcon from "../DynamicIcon";
import { NumericFormat } from "react-number-format";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Investments = () => {
  const [recentInvest, setRecentInvest] = useState<[InvestmentObjectType]>();
  const { data: transaction } = useQuery(GET_TRANSACTIONS);

  useEffect(() => {
    (async () => {
      const inv = await transaction?.transactions
        ?.filter((x: { account: string }) => x.account === "Investment")
        .slice(0, 2);
      setRecentInvest(inv);
    })();
  }, [transaction]);

  return (
    <SkeletonTheme
      baseColor="rgba(255,255,255,0.1)"
      customHighlightBackground="linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255, 127, 144,0.25)15%, rgba(196, 153, 252,0.35)40%, rgba(255, 139, 152,0.45) 60%, rgba(255, 222, 148,0.25)85%, rgba(255,255,255,0.1) 100%)"
    >
      <div className="mt-14 mr-auto w-[90%]">
        <h3 className="font-roboto mb-3 text-2xl tracking-tighter text-zinc-900">
          My Investments
        </h3>
        <ul className="flex flex-col items-center justify-center gap-2">
          {recentInvest ? (
            recentInvest?.map((investment) => {
              const date = new Date(+investment?.date);
              return (
                <motion.li
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.6,
                  }}
                  key={investment._id}
                  className="shadow-main flex w-full items-center justify-start gap-6 bg-zinc-50 px-5 py-3"
                >
                  <div className="grid h-12 w-12 place-items-center bg-orange-500 p-1">
                    {<DynamicIcon icon={investment.category} />}
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="">
                      <h4 className="text-lg font-bold text-zinc-900">
                        {investment.description}
                      </h4>
                      <p className="tracking-tighter text-zinc-500">
                        {investment.location}
                      </p>
                    </div>
                    <div className="">
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
                    <div className="">
                      <h4 className="text-lg font-semibold text-zinc-900">
                        {date.toLocaleDateString()}
                      </h4>
                      <p className="tracking-tighter text-zinc-500">Date</p>
                    </div>
                  </div>
                </motion.li>
              );
            })
          ) : (
            <div className="flex flex-col gap-2">
              <div className="shadow-main flex w-full items-center justify-between gap-6 bg-zinc-50 px-5 py-3">
                <div className="flex items-center justify-start gap-2">
                  <Skeleton style={{ width: 3 + "em", height: 3 + "em" }} />

                  <div className="flex flex-col gap-2">
                    <Skeleton style={{ width: 11 + "em", height: 1 + "em" }} />
                    <Skeleton
                      style={{ width: 8 + "em", height: 0.75 + "em" }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Skeleton style={{ width: 11 + "em", height: 1 + "em" }} />
                    <Skeleton
                      style={{ width: 8 + "em", height: 0.75 + "em" }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Skeleton style={{ width: 11 + "em", height: 1 + "em" }} />
                    <Skeleton
                      style={{ width: 8 + "em", height: 0.75 + "em" }}
                    />
                  </div>
                </div>
              </div>
              <div className="shadow-main flex w-full items-center justify-between gap-6 bg-zinc-50 px-5 py-3">
                <div className="flex items-center justify-start gap-2">
                  <Skeleton style={{ width: 3 + "em", height: 3 + "em" }} />

                  <div className="flex flex-col gap-2">
                    <Skeleton style={{ width: 11 + "em", height: 1 + "em" }} />
                    <Skeleton
                      style={{ width: 8 + "em", height: 0.75 + "em" }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Skeleton style={{ width: 11 + "em", height: 1 + "em" }} />
                    <Skeleton
                      style={{ width: 8 + "em", height: 0.75 + "em" }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Skeleton style={{ width: 11 + "em", height: 1 + "em" }} />
                    <Skeleton
                      style={{ width: 8 + "em", height: 0.75 + "em" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    </SkeletonTheme>
  );
};

export default Investments;
