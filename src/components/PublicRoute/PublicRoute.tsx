import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

function PublicRoute() {
  const { isLoggedIn, isRefreshing } = useAppSelector((state) => state.auth);

  if (isRefreshing) {
    return null;
  }

  return isLoggedIn ? <Navigate to="/recommended" replace /> : <Outlet />;
}

export default PublicRoute;
