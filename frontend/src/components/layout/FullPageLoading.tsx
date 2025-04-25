import CircleLoader from "react-spinners/CircleLoader";

const FullPageLoading = () => {
  return (
    <div className="absolute z-50 flex h-screen w-screen flex-col items-center justify-center text-purple-950">
      <div className="grid aspect-square place-items-center gap-2 rounded-md bg-amber-50/15 p-10 shadow-[0px_0px_10px_1000px_hsla(254,35%,14%,0.4)]">
        <CircleLoader size={96} color="#402094" />
        <div className="relative text-2xl font-bold">
          Loading
          <span className="absolute -right-7 -bottom-0.5 text-xl">...</span>
        </div>
      </div>
    </div>
  );
};

export default FullPageLoading;
