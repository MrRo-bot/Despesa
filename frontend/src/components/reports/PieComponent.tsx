import { SetStateAction, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

import { income } from "../../utils/constants";

import { CategoryType, TransactionObjectType } from "../../types/types";

const PieComponent = ({
  transaction,
}: {
  transaction: { transactions: TransactionObjectType[] };
}) => {
  const [incCategoryMap, setIncCategoryMap] = useState<CategoryType[]>([]);

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

    const finalInc: SetStateAction<CategoryType[]> = [];
    for (const c in allCategoryData) {
      if (allCategoryData[c] > 0) {
        income.map(
          (inc) =>
            inc === c &&
            finalInc.push({ category: c, total: allCategoryData[c] }),
        );
      }
    }

    setIncCategoryMap(finalInc);
  }, [transaction?.transactions]);

  return incCategoryMap.length ? (
    <Pie
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
            hoverBorderColor: ["#1E90FF", "#FF6384", "#D2691E", "#6B8E23"],
            backgroundColor: ["#1E90FF", "#FF6384", "#D2691E", "#6B8E23"],
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
  );
};

export default PieComponent;
