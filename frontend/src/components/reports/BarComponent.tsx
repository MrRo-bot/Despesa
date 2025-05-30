import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ChartArea } from "chart.js";
import "chart.js/auto";

import { MonthWiseType, TransactionObjectType } from "../../types/types";

const BarComponent = ({
  transaction,
}: {
  transaction: { transactions: TransactionObjectType[] };
}) => {
  const [monthWiseExp, setMonthWiseExp] = useState<[MonthWiseType]>([
    {
      Month: "",
      Income: 0,
      Savings: 0,
      Expenses: 0,
      Investments: 0,
      EpochTime: 0,
      Ratio: 0,
    },
  ]);

  useEffect(() => {
    const obj = {
      expenses: 0,
      investments: 0,
      income: 0,
      savings: 0,
      epochTime: 0,
      ratio: 0,
    };

    const monthExp: Record<
      string,
      {
        expenses: number;
        investments: number;
        income: number;
        savings: number;
        epochTime: number | string;
        ratio?: number;
      }
    > = {
      Jan: {
        ...obj,
      },
      Feb: {
        ...obj,
      },
      Mar: {
        ...obj,
      },
      Apr: {
        ...obj,
      },
      May: {
        ...obj,
      },
      Jun: {
        ...obj,
      },
      Jul: {
        ...obj,
      },
      Aug: {
        ...obj,
      },
      Sep: {
        ...obj,
      },
      Oct: {
        ...obj,
      },
      Nov: {
        ...obj,
      },
      Dec: {
        ...obj,
      },
    };

    const today = new Date();
    const sevenMonthsAgo = new Date();
    sevenMonthsAgo.setMonth(today.getMonth() - 6); // Set to 6 months ago

    // Format as YYYY-MM
    const startDate = sevenMonthsAgo.toISOString().slice(0, 7);
    const endDate = today.toISOString().slice(0, 7);

    // Filter transactions within the last 6 months
    const lastSixMonthTransactions = transaction?.transactions?.filter(
      (item: { date: string | number }) => {
        const date = new Date(+item.date).toISOString().slice(0, 7);
        return date >= startDate && date <= endDate;
      },
    );

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
            const expenses: number =
              item.account === "Expense" ? item.amount : 0;
            const investments: number =
              item.account === "Investment" ? item.amount : 0;
            const income: number = item.account === "Income" ? item.amount : 0;
            const savings: number = item.account === "Saving" ? item.amount : 0;

            return (monthExp[date] = {
              expenses: monthExp[date].expenses + expenses,
              investments: monthExp[date].investments + investments,
              income: monthExp[date].income + income,
              savings: monthExp[date].savings + savings,
              epochTime: item.date,
            });
          },
        );
    }

    const finalList = [];
    for (const mon in monthExp) {
      if (monthExp[mon].epochTime !== 0) {
        finalList.push({
          Month: mon,
          Expenses: monthExp[mon].expenses,
          Investments: monthExp[mon].investments,
          Income: monthExp[mon].income,
          Savings: monthExp[mon].savings,
          EpochTime: monthExp[mon].epochTime,
          Ratio:
            (monthExp[mon].expenses /
              (monthExp[mon].income + monthExp[mon].savings)) *
            100,
        });
      }
    }
    //@ts-expect-error: a and b are monthExp object type
    setMonthWiseExp(finalList.sort((a, b) => a.EpochTime - b.EpochTime));
  }, [transaction, transaction.transactions]);

  return monthWiseExp.length ? (
    <Bar
      options={{
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 10,
        },
        plugins: {
          legend: {
            labels: {
              font: {
                family: "Roboto Mono",
                weight: "bold",
              },
            },
          },
        },
      }}
      data={{
        labels: [...monthWiseExp.map((mon) => mon.Month)],
        datasets: [
          {
            label: "Income",
            data: [...monthWiseExp.map((monInc) => monInc.Income)],
            hoverBackgroundColor: "#1E90FF70",
            hoverBorderColor: "#1E90FF",
            backgroundColor: function (context) {
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
                  gradient.addColorStop(1, "#1E90FF70");
                  gradient.addColorStop(0.5, "#1E90FF85");
                  gradient.addColorStop(0, "#1E90FF");
                }

                return gradient;
              }
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              return getGradient(ctx, chartArea);
            },
            borderColor: "#1E90FF50",
            borderWidth: 2,
            borderRadius: 10,
            borderSkipped: false,
          },
          {
            label: "Savings",
            data: [...monthWiseExp.map((monSav) => monSav.Savings)],
            hoverBackgroundColor: "#6B8E2370",
            hoverBorderColor: "#6B8E23",
            backgroundColor: function (context) {
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
                  gradient.addColorStop(1, "#6B8E2370");
                  gradient.addColorStop(0.5, "#6B8E2385");
                  gradient.addColorStop(0, "#6B8E23");
                }

                return gradient;
              }
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              return getGradient(ctx, chartArea);
            },
            borderColor: "#6B8E2350",
            borderWidth: 2,
            borderRadius: 10,
            borderSkipped: false,
          },
          {
            label: "Expenses",
            data: [...monthWiseExp.map((monExp) => monExp.Expenses)],
            hoverBackgroundColor: "#FF4D4D70",
            hoverBorderColor: "#FF4D4D",
            backgroundColor: function (context) {
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
                  gradient.addColorStop(1, "#FF4D4D70");
                  gradient.addColorStop(0.5, "#FF4D4D85");
                  gradient.addColorStop(0, "#FF4D4D");
                }

                return gradient;
              }
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              return getGradient(ctx, chartArea);
            },
            borderColor: "#FF4D4D50",
            borderWidth: 2,
            borderRadius: 10,
            borderSkipped: false,
          },
          {
            label: "Investments",
            data: [...monthWiseExp.map((monInv) => monInv.Investments)],
            hoverBackgroundColor: "#D2691E70",
            hoverBorderColor: "#D2691E",
            backgroundColor: function (context) {
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
                  gradient.addColorStop(1, "#D2691E70");
                  gradient.addColorStop(0.5, "#D2691E85");
                  gradient.addColorStop(0, "#D2691E");
                }

                return gradient;
              }
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              return getGradient(ctx, chartArea);
            },
            borderColor: "#D2691E50",
            borderWidth: 2,
            borderRadius: 10,
            borderSkipped: false,
          },
        ],
      }}
    />
  ) : (
    <div className="text-center text-2xl font-semibold text-zinc-900/70">
      No Payment report found
    </div>
  );
};

export default BarComponent;
