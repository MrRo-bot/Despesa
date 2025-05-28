const FullPageLoading = () => {
  return (
    <div className="absolute z-50 flex h-screen w-screen flex-col items-center justify-center text-purple-950">
      <div className="animate-tick aspect-square rounded-full bg-amber-50/15 p-10 shadow-[0px_0px_10px_1000px_hsla(254,35%,14%,0.4)]">
        <img loading="lazy" className="h-24 w-24" src="logo.svg" alt="" />
      </div>
    </div>
  );
};

export default FullPageLoading;
