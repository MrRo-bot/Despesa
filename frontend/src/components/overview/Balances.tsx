import { TbChartPie, TbMoneybag } from "react-icons/tb";

const Balances = () => {
  return (
    <div className="mr-auto flex w-[90%] items-center gap-8">
      <div className="flex items-center justify-center gap-3 rounded-full bg-zinc-50 px-6 py-4">
        <div className="grid min-h-18 min-w-18 place-items-center rounded-full bg-zinc-900">
          <TbMoneybag className="h-8 w-8 text-zinc-50" />
        </div>
        <div className="flex flex-col gap-1 text-zinc-900">
          <h5 className="tracking-tight">Spending in Jul</h5>
          <h3 className="text-3xl">1,250</h3>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 rounded-full bg-zinc-900 px-6 py-4">
        <div className="grid min-h-18 min-w-18 place-items-center rounded-full bg-zinc-50">
          <TbChartPie className="h-8 w-8 text-zinc-900" />
        </div>
        <div className="flex flex-col gap-1 text-zinc-50">
          <h5 className="tracking-tight">Investmented Amount</h5>
          <h3 className="text-3xl">1,250</h3>
        </div>
      </div>
    </div>
  );
};

export default Balances;
