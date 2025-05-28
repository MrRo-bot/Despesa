import { useQuery } from "@apollo/client";
import { SetStateAction, useEffect, useState } from "react";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import {
  account as accountList,
  paymentType as paymentList,
} from "../utils/constants";
import { Bar, Doughnut, Line, Pie, PolarArea } from "react-chartjs-2";
import "chart.js/auto";
import { GiLobArrow } from "react-icons/gi";
import { ChartArea, ScriptableContext } from "chart.js";
import { color, getHoverColor } from "chart.js/helpers";
import { motion } from "motion/react";

const Reports = () => {
  const [expCategoryMap, setExpCategoryMap] = useState<
    { category: string; total: number }[]
  >([]);
  const [incCategoryMap, setIncCategoryMap] = useState<
    { category: string; total: number }[]
  >([]);
  const [accountMap, setAccountMap] = useState<
    { account: string; total: number }[]
  >([]);
  const [paymentMap, setPaymentMap] = useState<
    { paymentType: string; total: number }[]
  >([]);
  const [monthWiseExp, setMonthWiseExp] = useState<
    [
      {
        Month: string;
        Income: number;
        Savings: number;
        Expenses: number;
        Investments: number;
        EpochTime: number;
        Ratio: number;
      },
    ]
  >([
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

  const { data: transaction } = useQuery(GET_TRANSACTIONS);

  const income = [
    "Bonus",
    "Pocket Money",
    "Salary",
    "Profits",
    "Allowance",
    "Petty Cash",
  ];

  const expenses = [
    "Food",
    "Social Life",
    "Self Development",
    "Transportation",
    "Household",
    "Apparel",
    "Beauty",
    "Sports",
    "Health",
    "Culture",
    "Education",
    "Gift",
    "Electronics",
    "Other",
  ];

  const category = {
    Food: 0,
    "Social Life": 0,
    "Self Development": 0,
    Transportation: 0,
    Household: 0,
    Apparel: 0,
    Beauty: 0,
    Sports: 0,
    Health: 0,
    Culture: 0,
    Education: 0,
    Gift: 0,
    Electronics: 0,
    Other: 0,
    Bonus: 0,
    "Pocket Money": 0,
    Salary: 0,
    Profits: 0,
    Allowance: 0,
    "Petty Cash": 0,
  };

  const account = {
    Saving: 0,
    Expense: 0,
    Investment: 0,
    Income: 0,
  };

  const paymentType = {
    "Mobile Banking": 0,
    Card: 0,
    Cash: 0,
  };

  useEffect(() => {
    const allCategoryData = transaction?.transactions.reduce(
      (
        acc: { [x: string]: number },
        item: { category: string; amount: number },
      ) => {
        const { category, amount } = item;
        acc[category] = (acc[category] || 0) + amount;
        return acc;
      },
      category,
    );
    const allAccountData = transaction?.transactions.reduce(
      (
        acc: { [x: string]: number },
        item: { account: string; amount: number },
      ) => {
        const { account, amount } = item;
        acc[account] = (acc[account] || 0) + amount;
        return acc;
      },
      account,
    );
    const allPaymentData = transaction?.transactions.reduce(
      (
        acc: { [x: string]: number },
        item: { paymentType: string; amount: number },
      ) => {
        const { paymentType, amount } = item;
        acc[paymentType] = (acc[paymentType] || 0) + amount;
        return acc;
      },
      paymentType,
    );

    const finalExp: SetStateAction<{ category: string; total: number }[]> = [];
    const finalInc: SetStateAction<{ category: string; total: number }[]> = [];
    const finalAcc: SetStateAction<{ account: string; total: number }[]> = [];
    const finalPay: SetStateAction<{ paymentType: string; total: number }[]> =
      [];
    for (const c in allCategoryData) {
      if (allCategoryData[c] > 0) {
        income.map(
          (inc) =>
            inc === c &&
            finalInc.push({ category: c, total: parseInt(allCategoryData[c]) }),
        );
        expenses.map(
          (exp) =>
            exp === c &&
            finalExp.push({ category: c, total: parseInt(allCategoryData[c]) }),
        );
      }
    }
    for (const a in allAccountData) {
      if (allAccountData[a] > 0) {
        accountList.map(
          (acc) =>
            acc === a &&
            finalAcc.push({ account: a, total: parseInt(allAccountData[a]) }),
        );
      }
    }
    for (const p in allPaymentData) {
      if (allPaymentData[p] > 0) {
        paymentList.map(
          (pay) =>
            pay === p &&
            finalPay.push({
              paymentType: p,
              total: parseInt(allPaymentData[p]),
            }),
        );
      }
    }
    setExpCategoryMap(finalExp);
    setIncCategoryMap(finalInc);
    setAccountMap(finalAcc);
    setPaymentMap(finalPay);

    //bar graph data ===============================================
    const monthExp = {
      Jan: {
        expenses: 0,
        investments: 0,
        income: 0,
        savings: 0,
        epochTime: 0,
        ratio: 0,
      },
      Feb: {
        expenses: 0,
        investments: 0,
        income: 0,
        savings: 0,
        epochTime: 0,
        ratio: 0,
      },
      Mar: {
        expenses: 0,
        investments: 0,
        income: 0,
        savings: 0,
        epochTime: 0,
        ratio: 0,
      },
      Apr: {
        expenses: 0,
        investments: 0,
        income: 0,
        savings: 0,
        epochTime: 0,
        ratio: 0,
      },
      May: {
        expenses: 0,
        investments: 0,
        income: 0,
        savings: 0,
        epochTime: 0,
        ratio: 0,
      },
      Jun: {
        expenses: 0,
        investments: 0,
        income: 0,
        savings: 0,
        epochTime: 0,
        ratio: 0,
      },
      Jul: {
        expenses: 0,
        investments: 0,
        income: 0,
        savings: 0,
        epochTime: 0,
        ratio: 0,
      },
      Aug: {
        expenses: 0,
        investments: 0,
        income: 0,
        savings: 0,
        epochTime: 0,
        ratio: 0,
      },
      Sep: {
        expenses: 0,
        investments: 0,
        income: 0,
        savings: 0,
        epochTime: 0,
        ratio: 0,
      },
      Oct: {
        expenses: 0,
        investments: 0,
        income: 0,
        savings: 0,
        epochTime: 0,
        ratio: 0,
      },
      Nov: {
        expenses: 0,
        investments: 0,
        income: 0,
        savings: 0,
        epochTime: 0,
        ratio: 0,
      },
      Dec: {
        expenses: 0,
        investments: 0,
        income: 0,
        savings: 0,
        epochTime: 0,
        ratio: 0,
      },
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
            const expenses: number =
              item.account === "Expense" ? item.amount : 0;
            const investments: number =
              item.account === "Investment" ? item.amount : 0;
            const income: number = item.account === "Income" ? item.amount : 0;
            const savings: number = item.account === "Saving" ? item.amount : 0;

            // @ts-expect-error: same ol string used as array index error
            return (monthExp[date] = {
              // @ts-expect-error: same ol string used as array index error
              expenses: monthExp[date].expenses + expenses,
              // @ts-expect-error: same ol string used as array index error
              investments: monthExp[date].investments + investments,
              // @ts-expect-error: same ol string used as array index error
              income: monthExp[date].income + income,
              // @ts-expect-error: same ol string used as array index error
              savings: monthExp[date].savings + savings,
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
          Expenses: monthExp[mon].expenses,
          // @ts-expect-error: same ol string used as array index error
          Investments: monthExp[mon].investments,
          // @ts-expect-error: same ol string used as array index error
          Income: monthExp[mon].income,
          // @ts-expect-error: same ol string used as array index error
          Savings: monthExp[mon].savings,
          // @ts-expect-error: same ol string used as array index error
          EpochTime: monthExp[mon].epochTime,
          Ratio:
            // @ts-expect-error: same ol string used as array index error
            (monthExp[mon].expenses /
              // @ts-expect-error: same ol string used as array index error
              (monthExp[mon].income + monthExp[mon].savings)) *
            100,
        });
      }
    }

    //@ts-expect-error: {Month:string,Total:number,EpochTime:number}
    setMonthWiseExp(finalList.sort((a, b) => a.EpochTime - b.EpochTime));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transaction?.transactions]);

  return (
    <div className="h-[90vh] w-full p-5">
      <div className="grid h-full grid-cols-[2fr_1fr_1fr_1fr] grid-rows-[1.25fr_1fr] gap-3">
        {/* doughnut chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
          className="relative col-start-1 col-end-2 row-start-1 row-end-2 flex h-full w-full items-center justify-center rounded-xl bg-zinc-50/90 shadow-sm shadow-zinc-50/70"
        >
          {expCategoryMap.length && (
            <div className="pointer-events-none absolute top-0 right-0 flex rotate-6 flex-col items-center justify-center gap-1">
              <div className="rounded-2xl bg-amber-400 px-4 py-1 text-center text-lg font-bold text-amber-950">
                CLICK TO TOGGLE
              </div>
              <GiLobArrow className="h-10 w-10 rotate-[105deg] text-amber-600" />
            </div>
          )}
          {expCategoryMap.length ? (
            <Doughnut
              options={{
                responsive: true,
                aspectRatio: 16 / 9,
                layout: {
                  padding: {
                    top: 5,
                    bottom: 5,
                    right: 10,
                  },
                },
                plugins: {
                  legend: {
                    position: "right",
                    align: "center",
                    labels: {
                      padding: 10,
                      font: { family: "Roboto Mono", weight: "bold" },
                    },
                  },
                },
              }}
              data={{
                labels: [...expCategoryMap.map((exp) => exp.category)],
                datasets: [
                  {
                    label: "Categories",
                    data: [...expCategoryMap.map((exp) => exp.total)],
                    hoverBackgroundColor: [
                      "#1E90FF70",
                      "#FFD70070",
                      "#98FB9870",
                      "#70809070",
                      "#FF638470",
                      "#D2691E70",
                      "#F0808070",
                      "#D2B48C70",
                      "#DDA0DD70",
                      "#20B2AA70",
                      "#FF4D4D70",
                      "#9966FF70",
                      "#6B8E2370",
                    ],
                    hoverBorderColor: [
                      "#1E90FF",
                      "#FFD700",
                      "#98FB98",
                      "#708090",
                      "#FF6384",
                      "#D2691E",
                      "#F08080",
                      "#D2B48C",
                      "#DDA0DD",
                      "#20B2AA",
                      "#FF4D4D",
                      "#9966FF",
                      "#6B8E23",
                    ],
                    backgroundColor: [
                      "#1E90FF",
                      "#FFD700",
                      "#98FB98",
                      "#708090",
                      "#FF6384",
                      "#D2691E",
                      "#F08080",
                      "#D2B48C",
                      "#DDA0DD",
                      "#20B2AA",
                      "#FF4D4D",
                      "#9966FF",
                      "#6B8E23",
                    ],
                    hoverOffset: 10,
                    borderRadius: 10,
                    spacing: 5,
                  },
                ],
              }}
            />
          ) : (
            <div className="text-center text-2xl font-semibold text-zinc-900/70">
              No category report found
            </div>
          )}
        </motion.div>
        {/* bar chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
          className="relative col-start-2 col-end-5 row-start-1 row-end-2 flex h-full w-full items-center justify-center rounded-xl bg-zinc-50/90 shadow-sm shadow-zinc-50/70"
        >
          {monthWiseExp.length ? (
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
          )}
        </motion.div>
        {/* pie chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring", delay: 0.3 }}
          className="relative col-start-1 col-end-2 row-start-2 row-end-3 flex h-full w-full items-center justify-center rounded-xl bg-zinc-50/90 shadow-sm shadow-zinc-50/70"
        >
          {incCategoryMap.length ? (
            <Pie
              options={{
                responsive: true,
                aspectRatio: 16 / 9,
                layout: {
                  padding: {
                    top: 5,
                    bottom: 5,
                    right: 10,
                  },
                },
                plugins: {
                  legend: {
                    position: "right",
                    align: "center",
                    labels: {
                      padding: 10,
                      font: { family: "Roboto Mono", weight: "bold" },
                    },
                  },
                },
              }}
              data={{
                labels: [...incCategoryMap.map((inc) => inc.category)],
                datasets: [
                  {
                    label: "Income",
                    data: [...incCategoryMap.map((inc) => inc.total)],
                    hoverBackgroundColor: [
                      "#1E90FF70",
                      "#FF638470",
                      "#D2691E70",
                      "#6B8E2370",
                    ],
                    hoverBorderColor: [
                      "#1E90FF",
                      "#FF6384",
                      "#D2691E",
                      "#6B8E23",
                    ],
                    backgroundColor: [
                      "#1E90FF",
                      "#FF6384",
                      "#D2691E",
                      "#6B8E23",
                    ],
                    hoverOffset: 10,
                    borderRadius: 5,
                  },
                ],
              }}
            />
          ) : (
            <div className="text-center text-2xl font-semibold text-zinc-900/70">
              No Income report found
            </div>
          )}
        </motion.div>
        {/* polarArea chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring", delay: 0.4 }}
          className="relative col-start-2 col-end-3 row-start-2 row-end-3 flex h-full w-full items-center justify-center rounded-xl bg-zinc-50/90 shadow-sm shadow-zinc-50/70"
        >
          {accountMap.length ? (
            <PolarArea
              options={{
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                  padding: {
                    top: 5,
                    bottom: 5,
                    left: 7,
                    right: 7,
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      font: { family: "Roboto Mono", weight: "bold" },
                    },
                  },
                },
                elements: {
                  arc: {
                    backgroundColor: function (context) {
                      const colors = [
                        "#75BAFF",
                        "#FF3662",
                        "#FF832A",
                        "#C1FF44",
                      ];
                      const cache = new Map();
                      let width: number | null = null;
                      let height: number | null = null;
                      function createRadialGradient3(
                        context: ScriptableContext<"polarArea">,
                        c1: string,
                        c2: string,
                        c3: string,
                      ) {
                        const chartArea = context.chart.chartArea;
                        if (!chartArea) {
                          // This case happens on initial chart load
                          return;
                        }

                        const chartWidth = chartArea.right - chartArea.left;
                        const chartHeight = chartArea.bottom - chartArea.top;
                        if (width !== chartWidth || height !== chartHeight) {
                          cache.clear();
                        }
                        let gradient = cache.get(c1 + c2 + c3);
                        if (!gradient) {
                          // Create the gradient because this is either the first render
                          // or the size of the chart has changed
                          width = chartWidth;
                          height = chartHeight;
                          const centerX =
                            (chartArea.left + chartArea.right) / 2;
                          const centerY =
                            (chartArea.top + chartArea.bottom) / 2;
                          const r = Math.min(
                            (chartArea.right - chartArea.left) / 2,
                            (chartArea.bottom - chartArea.top) / 2,
                          );
                          const ctx = context.chart.ctx;
                          gradient = ctx.createRadialGradient(
                            centerX,
                            centerY,
                            0,
                            centerX,
                            centerY,
                            r,
                          );
                          gradient.addColorStop(0, c1);
                          gradient.addColorStop(0.5, c2);
                          gradient.addColorStop(1, c3);
                          cache.set(c1 + c2 + c3, gradient);
                        }

                        return gradient;
                      }
                      let c = colors[context.dataIndex];
                      if (!c) {
                        return;
                      }
                      if (context.active) {
                        c = getHoverColor(c);
                      }
                      const mid = color(c)
                        .desaturate(0.2)
                        .darken(0.2)
                        .rgbString();
                      const start = color(c)
                        .lighten(0.2)
                        .rotate(270)
                        .rgbString();
                      const end = color(c).lighten(0.1).rgbString();
                      return createRadialGradient3(context, start, mid, end);
                    },
                  },
                },
              }}
              data={{
                labels: [...accountMap.map((acc) => acc.account)],
                datasets: [
                  {
                    label: "Accounts",
                    data: [...accountMap.map((acc) => acc.total)],
                    hoverOffset: 30,
                  },
                ],
              }}
            />
          ) : (
            <div className="text-center text-2xl font-semibold text-zinc-900/70">
              No Account report found
            </div>
          )}
        </motion.div>
        {/* line chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring", delay: 0.5 }}
          className="relative col-start-3 col-end-4 row-start-2 row-end-3 flex h-full w-full items-center justify-center rounded-xl bg-zinc-50/90 shadow-sm shadow-zinc-50/70"
        >
          {monthWiseExp.length ? (
            <Line
              options={{
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                  padding: {
                    top: 5,
                    bottom: 5,
                    left: 7,
                    right: 7,
                  },
                },
                scales: {
                  x: {
                    beginAtZero: false,
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    grid: {
                      display: false,
                    },
                  },
                },
                interaction: {
                  intersect: false,
                  axis: "x",
                },
                plugins: {
                  title: {
                    display: true,
                    text: "Income - Expense Ratio (Less is BETTER)",
                    padding: {
                      top: 10,
                      bottom: 10,
                    },
                  },
                  legend: {
                    labels: {
                      font: { family: "Roboto Mono", weight: "bold" },
                    },
                  },
                },
                elements: {
                  point: {
                    radius: 0,
                  },
                },
              }}
              data={{
                labels: [...monthWiseExp.map((monExp) => monExp.Month)],
                datasets: [
                  {
                    label: "Ratio",
                    data: [...monthWiseExp.map((monRatio) => monRatio.Ratio)],
                    fill: true,
                    tension: 0.4,
                    borderColor: "transparent",
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
                          gradient.addColorStop(
                            0,
                            "oklch(0.398 0.195 277.366)",
                          );
                          gradient.addColorStop(
                            0.5,
                            "oklch(0.459 0.187 3.815)",
                          );
                          gradient.addColorStop(1, "oklch(0.459 1.187 3.815)");
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
            />
          ) : (
            <div className="text-center text-2xl font-semibold text-zinc-900/70">
              No ratio found
            </div>
          )}
        </motion.div>
        {/* polarArea chart */}
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring", delay: 0.6 }}
          className="relative col-start-4 col-end-5 row-start-2 row-end-3 flex h-full w-full items-center justify-center rounded-xl bg-zinc-50/90 shadow-sm shadow-zinc-50/70"
        >
          {paymentMap.length ? (
            <PolarArea
              options={{
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                  padding: {
                    top: 5,
                    bottom: 5,
                    left: 7,
                    right: 7,
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      font: { family: "Roboto Mono", weight: "bold" },
                    },
                  },
                },
                elements: {
                  arc: {
                    backgroundColor: function (context) {
                      const colors = [
                        "#752AFF",
                        "#dd99b4",
                        "#dd832A",
                        "#C12244",
                      ];
                      const cache = new Map();
                      let width: number | null = null;
                      let height: number | null = null;
                      function createRadialGradient3(
                        context: ScriptableContext<"polarArea">,
                        c1: string,
                        c2: string,
                        c3: string,
                      ) {
                        const chartArea = context.chart.chartArea;
                        if (!chartArea) {
                          // This case happens on initial chart load
                          return;
                        }

                        const chartWidth = chartArea.right - chartArea.left;
                        const chartHeight = chartArea.bottom - chartArea.top;
                        if (width !== chartWidth || height !== chartHeight) {
                          cache.clear();
                        }
                        let gradient = cache.get(c1 + c2 + c3);
                        if (!gradient) {
                          // Create the gradient because this is either the first render
                          // or the size of the chart has changed
                          width = chartWidth;
                          height = chartHeight;
                          const centerX =
                            (chartArea.left + chartArea.right) / 2;
                          const centerY =
                            (chartArea.top + chartArea.bottom) / 2;
                          const r = Math.min(
                            (chartArea.right - chartArea.left) / 2,
                            (chartArea.bottom - chartArea.top) / 2,
                          );
                          const ctx = context.chart.ctx;
                          gradient = ctx.createRadialGradient(
                            centerX,
                            centerY,
                            0,
                            centerX,
                            centerY,
                            r,
                          );
                          gradient.addColorStop(0, c1);
                          gradient.addColorStop(0.5, c2);
                          gradient.addColorStop(1, c3);
                          cache.set(c1 + c2 + c3, gradient);
                        }

                        return gradient;
                      }
                      let c = colors[context.dataIndex];
                      if (!c) {
                        return;
                      }
                      if (context.active) {
                        c = getHoverColor(c);
                      }
                      const mid = color(c)
                        .desaturate(0.2)
                        .darken(0.2)
                        .rgbString();
                      const start = color(c)
                        .lighten(0.2)
                        .rotate(270)
                        .rgbString();
                      const end = color(c).lighten(0.1).rgbString();
                      return createRadialGradient3(context, start, mid, end);
                    },
                  },
                },
              }}
              data={{
                labels: [...paymentMap.map((pay) => pay.paymentType)],
                datasets: [
                  {
                    label: "Payment Type",
                    data: [...paymentMap.map((pay) => pay.total)],
                    hoverOffset: 30,
                  },
                ],
              }}
            />
          ) : (
            <div className="text-center text-2xl font-semibold text-zinc-900/70">
              No Payment report found
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
export default Reports;
