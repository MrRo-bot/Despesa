import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";

const NavItem = ({
  navigateTo,
  title,
  icon,
}: {
  navigateTo: string;
  title: string;
  icon: ReactNode;
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <NavLink
        className={({ isActive, isPending }) =>
          `${isPending ? "text-blue-300" : isActive ? "text-zinc-50" : "text-zinc-500"} flex items-center justify-start transition-colors duration-400 ease-in-out`
        }
        to={navigateTo}
      >
        {icon}
        <span className="font-roboto ml-2 text-lg tracking-tighter">
          {title}
        </span>
      </NavLink>
    </motion.div>
  );
};

export default NavItem;
