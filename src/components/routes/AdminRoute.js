import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) return <>loading...</>;

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/page-not-found" replace />;
  }

  return <Outlet />;
}
