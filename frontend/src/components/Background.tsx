import { JSX } from "react";

const Background = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="text-zinc-50 absolute inset-0 -z-10 items-center bg-center bg-fixed overflow-y-scroll [background-image:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      {children}
    </div>
  );
};

export default Background;
