import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../../graphql/queries/transaction.query";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartArea } from "chart.js/auto";

const Chart = () => {
  const [monthWiseExp, setMonthWiseExp] = useState<
    [
      {
        Month: string;
        Total: number;
        EpochTime: number;
      },
    ]
  >([
    {
      Month: "",
      Total: 0,
      EpochTime: 0,
    },
  ]);

  const { data: transaction } = useQuery(GET_TRANSACTIONS);

  useEffect(() => {
    const monthExp = {
      Jan: { total: 0, epochTime: 0 },
      Feb: { total: 0, epochTime: 0 },
      Mar: { total: 0, epochTime: 0 },
      Apr: { total: 0, epochTime: 0 },
      May: { total: 0, epochTime: 0 },
      Jun: { total: 0, epochTime: 0 },
      Jul: { total: 0, epochTime: 0 },
      Aug: { total: 0, epochTime: 0 },
      Sep: { total: 0, epochTime: 0 },
      Oct: { total: 0, epochTime: 0 },
      Nov: { total: 0, epochTime: 0 },
      Dec: { total: 0, epochTime: 0 },
    };

    // Create a new Date object
    const today = new Date();
    const sevenMonthsAgo = new Date();
    sevenMonthsAgo.setMonth(today.getMonth() - 6); // Set to 6 months ago

    // Format as YYYY-MM
    const startDate = sevenMonthsAgo.toISOString().slice(0, 7);
    const endDate = today.toISOString().slice(0, 7);

    // Filter transactions within the last 6 months
    const lastSixMonthTransactions = transaction?.transactions.filter(
      (item: { date: string | number }) => {
        const date = new Date(+item.date).toISOString().slice(0, 7);
        return date >= startDate && date <= endDate;
      },
    );

    // Sort by date in descending order and Group by month and sum the amounts
    if (lastSixMonthTransactions) {
      lastSixMonthTransactions
        .sort((a: { date: string }, b: { date: string }) =>
          b.date.localeCompare(a.date),
        )
        .map(
          (item: {
            date: string | number;
            account: string;
            amount: number;
          }) => {
            const date: string = new Intl.DateTimeFormat("en-US", {
              month: "long",
            })
              .format(new Date(+item.date))
              .slice(0, 3);
            const amount: number =
              item.account === "Expense" || item.account === "Investment"
                ? item.amount
                : 0;

            // @ts-expect-error: same ol string used as array index error
            return (monthExp[date] = {
              // @ts-expect-error: same ol string used as array index error
              total: monthExp[date].total + amount,
              epochTime: item.date,
            });
          },
        );
    }

    const finalList = [];
    for (const mon in monthExp) {
      // @ts-expect-error: same ol string used as array index error
      if (monthExp[mon].epochTime !== 0) {
        finalList.push({
          Month: mon,
          // @ts-expect-error: same ol string used as array index error
          Total: monthExp[mon].total,
          // @ts-expect-error: same ol string used as array index error
          EpochTime: monthExp[mon].epochTime,
        });
      }
    }
    //@ts-expect-error: {Month:string,Total:number,EpochTime:number}
    setMonthWiseExp(finalList.sort((a, b) => a.EpochTime - b.EpochTime));
  }, [transaction?.transactions]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.2,
      }}
      className="shadow-main w-[90%] bg-zinc-50"
    >
      <h3 className="font-roboto my-3 px-2 text-2xl text-zinc-900">
        Total of Expenses + Investment{" "}
        <sub className="text-xs tracking-tighter text-zinc-500">
          (past 6 months)
        </sub>
      </h3>

      {monthWiseExp.length > 0 ? (
        <div className="relative min-h-[35vh] w-full px-2">
          <Line
            data={{
              labels: [...monthWiseExp.map((monExp) => monExp.Month)],
              datasets: [
                {
                  data: [...monthWiseExp.map((monExp) => monExp.Total)],
                  fill: true,
                  tension: 0.4,
                  borderColor: "transparent",
                  pointBackgroundColor: "hsl(267, 90%, 75%)",
                  pointBorderColor: "hsl(41, 100%, 78%)",
                  backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    let width: number,
                      height: number,
                      gradient: {
                        addColorStop: (arg0: number, arg1: string) => void;
                      };
                    function getGradient(
                      ctx: CanvasRenderingContext2D,
                      chartArea: ChartArea,
                    ) {
                      const chartWidth = chartArea.right - chartArea.left;
                      const chartHeight = chartArea.bottom - chartArea.top;
                      if (
                        !gradient ||
                        width !== chartWidth ||
                        height !== chartHeight
                      ) {
                        // Create the gradient because this is either the first render
                        // or the size of the chart has changed
                        width = chartWidth;
                        height = chartHeight;
                        gradient = ctx.createLinearGradient(
                          0,
                          chartArea.bottom,
                          0,
                          chartArea.top,
                        );
                        gradient.addColorStop(0, "hsl(267, 90%, 75%)");
                        gradient.addColorStop(0.5, "hsl(354, 100%, 78%)");
                        gradient.addColorStop(1, "hsl(41, 100%, 78%)");
                      }

                      return gradient;
                    }

                    if (!chartArea) {
                      // This case happens on initial chart load
                      return;
                    }
                    return getGradient(ctx, chartArea);
                  },
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 2,
                  hitRadius: 5,
                  hoverRadius: 5,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              interaction: {
                intersect: false,
                axis: "x",
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      ) : (
        <div className="my-5 ml-5 text-center text-lg font-semibold text-zinc-900/70 uppercase">
          Either haven't calculated data or data not available
        </div>
      )}
    </motion.div>
  );
};

export default Chart;
