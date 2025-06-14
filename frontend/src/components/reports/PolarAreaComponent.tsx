import { SetStateAction, useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import { ScriptableContext } from "chart.js";
import { color, getHoverColor } from "chart.js/helpers";
import "chart.js/auto";

import {
  account as accountList,
  paymentType as paymentList,
} from "../../utils/constants";

import { AccCategoryType, PayCategoryType } from "../../types/types";
import { TransactionObjectType } from "../../types/types";

const PolarAreaComponent = ({
  transaction,
  type,
}: {
  transaction: { transactions: TransactionObjectType };
  type: string;
}) => {
  const [accountMap, setAccountMap] = useState<AccCategoryType[]>([]);
  const [paymentMap, setPaymentMap] = useState<PayCategoryType[]>([]);

  useEffect(() => {
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

    //@ts-expect-error: no need for reduce type in TransactionObjectType
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

    //@ts-expect-error: no need for reduce type in TransactionObjectType
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

    const finalAcc: SetStateAction<AccCategoryType[]> = [];
    const finalPay: SetStateAction<PayCategoryType[]> = [];

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

    setAccountMap(finalAcc);
    setPaymentMap(finalPay);
  }, [transaction?.transactions]);

  return accountMap.length || paymentMap.length ? (
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
              const colors =
                type === "account"
                  ? ["#75BAFF", "#FF3662", "#FF832A", "#C1FF44"]
                  : ["#752AFF", "#dd99b4", "#dd832A", "#C12244"];
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
                  const centerX = (chartArea.left + chartArea.right) / 2;
                  const centerY = (chartArea.top + chartArea.bottom) / 2;
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
                .alpha(0.8)
                .rgbString();
              const start = color(c)
                .lighten(0.2)
                .rotate(270)
                .alpha(0.8)
                .rgbString();
              const end = color(c).lighten(0.1).alpha(0.8).rgbString();
              return createRadialGradient3(context, start, mid, end);
            },
          },
        },
      }}
      data={{
        labels:
          type === "account"
            ? [...accountMap.map((acc) => acc.account)]
            : [...paymentMap.map((pay) => pay.paymentType)],
        datasets: [
          {
            label: type === "account" ? "Accounts" : "Payment Type",
            data:
              type === "account"
                ? [...accountMap.map((acc) => acc.total)]
                : [...paymentMap.map((pay) => pay.total)],
            hoverOffset: 30,
          },
        ],
      }}
    />
  ) : (
    <div className="text-center text-2xl font-semibold text-zinc-900/70">
      No {type === "account" ? "Account" : "Payment"} report found
    </div>
  );
};

export default PolarAreaComponent;
