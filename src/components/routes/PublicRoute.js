import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PublicRoute() {
  const { user, role, isInitialized, hasSessionHint } = useAuth();

  // Only block on very first load with a session hint
  if (!isInitialized && hasSessionHint) return null;

  // No data yet, no hint — show public page immediately
  if (!isInitialized) return <Outlet />;

  // ✅ Have data — redirect if already logged in
  if (user && role === "STUDENT") return <Navigate to="/auth/user/accommodation" replace />;
  if (user && role === "ADMIN") return <Navigate to="/auth/admin" replace />;
  if (user && role === "LAND_OWNER") return <Navigate to="/auth/landowner" replace />;

  return <Outlet />;
}

// // PublicRoute.jsx
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function PublicRoute() {
//   const { user, role, isInitialized } = useAuth();

//   if (!isInitialized) {
//     return <>loading...</>;
//   }

//   if (user) {
//     if (role === "STUDENT") {
//       return <Navigate to="/auth/user/accommodation" replace />;
//     }
//     if (role === "ADMIN") {
//       return <Navigate to="/auth/admin" replace />;  // change to your actual admin route
//     }
//     if (role === "LANDOWNER") {
//       return <Navigate to="/auth/landowner" replace />;  // change to your actual landowner route
//     }
//   }

//   return <Outlet />;
// }