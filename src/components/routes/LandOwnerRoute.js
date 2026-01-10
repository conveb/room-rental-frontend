import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function LandOwnerRoute() {
  const { user, loading } = useAuth();

  if (loading) return <>loading...</>;

  if (!user || user.role_name !== "LAND_OWNER") {
    return <Navigate to="/page-not-found" replace />;
  }

  return <Outlet />;
}
