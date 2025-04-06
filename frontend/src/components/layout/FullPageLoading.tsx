import RiseLoader from "react-spinners/RiseLoader";

const FullPageLoading = () => {
  return (
    <div className="absolute z-50 flex h-screen w-screen flex-col items-center justify-center gap-10 text-purple-950">
      <RiseLoader size={27} color="#402094" />
      <div className="text-2xl font-bold">LOADING...</div>
    </div>
  );
};

export default FullPageLoading;
