import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import css from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <div className={css.layout}>
      <div className={css.headerWrapper}>
        <Header />
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
