import { TbBrandSpotify } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const RecentTransactions = () => {
  return (
    <div className="shadow-main bg-zinc-50 p-4">
      <h3 className="font-roboto mb-2 text-2xl tracking-tighter text-zinc-900">
        Recent Transactions
      </h3>
      <div className="relative">
        <NavLink
          to="/transactions"
          className="absolute right-0 tracking-tighter text-zinc-700"
        >
          See all
        </NavLink>
        <div>
          <h4 className="my-3 text-lg font-bold text-zinc-900">Expenses</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-purple-400 p-3">
                <TbBrandSpotify className="h-8 w-8" />
              </div>
              <div>
                <h5 className="-my-1 text-lg font-medium text-zinc-900">
                  Spotify Subscription
                </h5>
                <p className="text-sm tracking-tighter text-zinc-500">
                  Shopping
                </p>
              </div>
            </div>
            <div className="font-semibold text-red-700">-₹25.00</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-red-400 p-3">
                <TbBrandSpotify className="h-8 w-8" />
              </div>
              <div>
                <h5 className="-my-1 text-lg font-medium text-zinc-900">
                  Spotify Subscription
                </h5>
                <p className="text-sm tracking-tighter text-zinc-500">
                  Shopping
                </p>
              </div>
            </div>
            <div className="font-semibold text-red-700">-₹25.00</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-400 p-3">
                <TbBrandSpotify className="h-8 w-8" />
              </div>
              <div>
                <h5 className="-my-1 text-lg font-medium text-zinc-900">
                  Spotify Subscription
                </h5>
                <p className="text-sm tracking-tighter text-zinc-500">
                  Shopping
                </p>
              </div>
            </div>
            <div className="font-semibold text-red-700">-₹25.00</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-yellow-400 p-3">
                <TbBrandSpotify className="h-8 w-8" />
              </div>
              <div>
                <h5 className="-my-1 text-lg font-medium text-zinc-900">
                  Spotify Subscription
                </h5>
                <p className="text-sm tracking-tighter text-zinc-500">
                  Shopping
                </p>
              </div>
            </div>
            <div className="font-semibold text-red-700">-₹25.00</div>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="my-3 text-lg font-bold text-zinc-900">
            Income & Savings
          </h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-green-400 p-3">
                <TbBrandSpotify className="h-8 w-8" />
              </div>
              <div>
                <h5 className="-my-1 text-lg font-medium text-zinc-900">
                  Spotify Subscription
                </h5>
                <p className="text-sm tracking-tighter text-zinc-500">
                  Shopping
                </p>
              </div>
            </div>
            <div className="font-semibold text-red-700">-₹25.00</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-teal-400 p-3">
                <TbBrandSpotify className="h-8 w-8" />
              </div>
              <div>
                <h5 className="-my-1 text-lg font-medium text-zinc-900">
                  Spotify Subscription
                </h5>
                <p className="text-sm tracking-tighter text-zinc-500">
                  Shopping
                </p>
              </div>
            </div>
            <div className="font-semibold text-red-700">-₹25.00</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-amber-400 p-3">
                <TbBrandSpotify className="h-8 w-8" />
              </div>
              <div>
                <h5 className="-my-1 text-lg font-medium text-zinc-900">
                  Spotify Subscription
                </h5>
                <p className="text-sm tracking-tighter text-zinc-500">
                  Shopping
                </p>
              </div>
            </div>
            <div className="font-semibold text-red-700">-₹25.00</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-400 p-3">
                <TbBrandSpotify className="h-8 w-8" />
              </div>
              <div>
                <h5 className="-my-1 text-lg font-medium text-zinc-900">
                  Spotify Subscription
                </h5>
                <p className="text-sm tracking-tighter text-zinc-500">
                  Shopping
                </p>
              </div>
            </div>
            <div className="font-semibold text-red-700">-₹25.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
