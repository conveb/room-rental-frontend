import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function AdminRoute() {
  const { user, role, loading } = useAuth();
  

  if (loading) return <>loading...</>;

  // Check if we're in the middle of logout (no user but still on admin page)
  if (!user) {
    // Instead of 404, redirect to signin
    return <Navigate to="/signin" replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/page-not-found" replace />;
  }

  return <Outlet />;
}