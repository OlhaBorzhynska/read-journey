import type { ReactNode } from "react";
import css from "./Dashboard.module.css";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard = ({ children }: DashboardProps) => {
  return <aside className={css.dashboard}>{children}</aside>;
};

export default Dashboard;
