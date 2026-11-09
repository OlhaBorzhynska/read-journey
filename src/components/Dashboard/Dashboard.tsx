import type { ReactNode } from "react";
import css from "./Dashboard.module.css";

interface DashboardProps {
  children: ReactNode;
  variant?: "default" | "library";
}

const Dashboard = ({ children, variant = "default" }: DashboardProps) => {
  return (
    <aside
      className={`${css.dashboard} ${
        variant === "library" ? css.libraryDashboard : ""
      }`}
    >
      {children}
    </aside>
  );
};

export default Dashboard;
