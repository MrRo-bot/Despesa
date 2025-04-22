import CircleLoader from "react-spinners/CircleLoader";

const FullPageLoading = () => {
  return (
    <div className="absolute z-50 flex h-screen w-screen flex-col items-center justify-center gap-5 text-purple-950">
      <CircleLoader size={96} color="#402094" />
      <div className="relative text-2xl font-bold">
        Loading
        <span className="absolute -right-7 -bottom-0.5 text-xl">...</span>
      </div>
    </div>
  );
};

export default FullPageLoading;
