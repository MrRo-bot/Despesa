import { SetStateAction, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

import { GiBottomRight3dArrow } from "react-icons/gi";

import { expenses } from "../../utils/constants";

import { CategoryType, TransactionObjectType } from "../../types/types";

const DoughnutComponent = ({
  transaction,
}: {
  transaction: { transactions: TransactionObjectType[] };
}) => {
  const [expCategoryMap, setExpCategoryMap] = useState<CategoryType[]>([]);

  useEffect(() => {
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

    const finalExp: SetStateAction<CategoryType[]> = [];

    for (const c in allCategoryData) {
      if (allCategoryData[c] > 0) {
        expenses.map(
          (exp) =>
            exp === c &&
            finalExp.push({ category: c, total: allCategoryData[c] }),
        );
      }
    }
    setExpCategoryMap(finalExp);
  }, [transaction?.transactions]);

  return (
    <>
      {expCategoryMap.length && (
        <div className="pointer-events-none absolute -top-4 right-0 flex rotate-6 flex-col items-center justify-center gap-1 md:top-0">
          <div className="rounded-2xl bg-amber-400 p-1 text-center font-bold text-amber-950 md:px-4 md:text-lg">
            CLICK TO TOGGLE
          </div>
          <motion.div
            animate={{ rotate: [0, 20, 0, -20, 0] }}
            transition={{
              duration: 1,
              repeatDelay: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="rotate-[90deg]"
          >
            <GiBottomRight3dArrow className="h-10 w-10 text-amber-600" />
          </motion.div>
        </div>
      )}
      {expCategoryMap.length ? (
        <Doughnut
          options={{
            responsive: true,
            maintainAspectRatio: false,
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
            labels: [
              ...expCategoryMap.map(
                (exp: { category: string }) => exp.category,
              ),
            ],
            datasets: [
              {
                label: "Categories",
                data: [
                  ...expCategoryMap.map((exp: { total: number }) => exp.total),
                ],
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
    </>
  );
};

export default DoughnutComponent;
