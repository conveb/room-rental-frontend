import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute() {
  const { user,role, loading } = useAuth();
  if (loading) {
    return <>loading...</>;
  }

if (!user || role !== "STUDENT") {
  return <Navigate to="/signin" replace />;
}

  return <Outlet />;
}
