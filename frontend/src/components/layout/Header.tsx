import { TbChevronDown } from "react-icons/tb";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="flex h-18 w-full items-center justify-between border-b border-b-zinc-800/40 px-10">
      <div>
        <h1 className="font-roboto text-3xl font-black tracking-tighter text-zinc-900">
          {location.pathname.slice(1, 2).toUpperCase() +
            location.pathname.slice(2) ||
            (location.pathname === "/" && "Overview")}
        </h1>
      </div>
      <div className="font-roboto shadow-main flex items-center justify-between gap-2 border border-zinc-700 p-2 tracking-wider text-zinc-500">
        <span className="text-sm font-extrabold tracking-tighter">
          My Balance
        </span>
        <span className="text-xl font-extrabold text-pink-700">1,20,000</span>
        <span className="flex cursor-pointer items-center gap-2 text-lg font-black text-pink-700">
          - INR <TbChevronDown className="h-4" />
        </span>
      </div>
    </header>
  );
};

export default Header;
