import { FaApple } from "react-icons/fa6";

const Investments = () => {
  return (
    <div className="mt-14 mr-auto w-[90%]">
      <h3 className="font-roboto mb-3 text-2xl tracking-tighter text-zinc-900">
        My Investments
      </h3>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="shadow-main flex w-full items-center justify-start gap-6 bg-zinc-50 px-5 py-3">
          <div className="bg-blue-600 p-1.5">
            <FaApple className="mb-0.5 h-8 w-8 text-zinc-50" />
          </div>
          <div className="flex w-full justify-between">
            <div className="">
              <h4 className="text-lg font-bold text-zinc-900">Apple Store</h4>
              <p className="tracking-tighter text-zinc-500">
                E-commerce, Marketplace
              </p>
            </div>
            <div className="">
              <h4 className="text-lg font-bold text-zinc-900">₹53,000</h4>
              <p className="tracking-tighter text-zinc-500">Investment Value</p>
            </div>
            <div className="">
              <h4 className="text-lg font-bold text-zinc-900">+16%</h4>
              <p className="tracking-tighter text-zinc-500">Return Value</p>
            </div>
          </div>
        </div>
        <div className="shadow-main flex w-full items-center justify-start gap-6 bg-zinc-50 px-5 py-3">
          <div className="bg-pink-600 p-1.5">
            <FaApple className="mb-0.5 h-8 w-8 text-zinc-50" />
          </div>
          <div className="flex w-full justify-between">
            <div className="">
              <h4 className="text-lg font-bold text-zinc-900">Apple Store</h4>
              <p className="tracking-tighter text-zinc-500">
                E-commerce, Marketplace
              </p>
            </div>
            <div className="">
              <h4 className="text-lg font-bold text-zinc-900">₹53,000</h4>
              <p className="tracking-tighter text-zinc-500">Investment Value</p>
            </div>
            <div className="">
              <h4 className="text-lg font-bold text-zinc-900">+16%</h4>
              <p className="tracking-tighter text-zinc-500">Return Value</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investments;
