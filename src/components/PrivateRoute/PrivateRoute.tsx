import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

function PrivateRoute() {
  const { isLoggedIn, isRefreshing } = useAppSelector((state) => state.auth);

  if (isRefreshing) {
    return null;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
