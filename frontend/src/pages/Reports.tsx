import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "October",
    EXPENSE: 3490,
    INCOME: 4300,
  },
  {
    name: "November",
    EXPENSE: 2390,
    INCOME: 3800,
  },
  {
    name: "December",
    EXPENSE: 1890,
    INCOME: 4800,
  },
  {
    name: "January",
    EXPENSE: 2780,
    INCOME: 3908,
  },
  {
    name: "February",
    EXPENSE: 2000,
    INCOME: 9800,
  },
  {
    name: "March",
    EXPENSE: 3000,
    INCOME: 1398,
  },
  {
    name: "April",
    EXPENSE: 4000,
    INCOME: 2400,
  },
];
const Reports = () => {
  return (
    <div className="mx-auto flex h-[90vh] w-full flex-col items-center justify-center px-10">
      <div className="mx-auto my-5 mr-auto h-[50%] w-[70%] rounded-2xl bg-zinc-50">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 10,
              bottom: 10,
              right: 20,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" iconType="circle" />
            <Bar
              barSize={20}
              dataKey="INCOME"
              fill="rgb(196, 153, 252)"
              activeBar={
                <Rectangle
                  fill="rgb(248,249,113)"
                  stroke="rgb(196, 153, 252)"
                />
              }
            />
            <Bar
              barSize={20}
              dataKey="EXPENSE"
              fill="rgb(255, 127, 144)"
              activeBar={
                <Rectangle fill="rgb(127,97,150)" stroke="rgb(255, 127, 144)" />
              }
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex h-1/2 w-full items-center justify-between gap-5"></div>
    </div>
  );
};

// rgb(255, 127, 144)
// rgb(196, 153, 252)
// rgb(255, 222, 148)
export default Reports;
