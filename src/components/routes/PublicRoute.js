import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PublicRoute() {
  const { user, role, isInitialized, hasSessionHint } = useAuth();

  if (!isInitialized) {
    // ✅ Might be logged in — wait silently (no text flash)
    if (hasSessionHint) return null;
    // Definitely not logged in — show public page immediately
    return <Outlet />;
  }

  if (user && role === "STUDENT") {
    return <Navigate to="/auth/user/accommodation" replace />;
  }
  if (user && role === "ADMIN") {
    return <Navigate to="/auth/admin" replace />;
  }
  if (user && role === "LANDOWNER") {
    return <Navigate to="/auth/landowner" replace />;
  }

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