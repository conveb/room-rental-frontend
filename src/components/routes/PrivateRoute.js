import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute() {
  const { user, role, isInitialized } = useAuth();

  if (!isInitialized) {
    return <>loading...</>; // still checking auth, don't decide yet
  }

  if (!user || role !== "STUDENT") {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}


// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function PrivateRoute() {
//   const { user,role, loading } = useAuth();
//   if (loading) {
//     return <>loading...</>;
//   }

// if (!user || role !== "STUDENT") {
//   return <Navigate to="/signin" replace />;
// }

//   return <Outlet />;
// }