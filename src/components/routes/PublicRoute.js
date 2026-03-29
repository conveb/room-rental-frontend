import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PublicRoute() {
  const { user, role, isInitialized, hasSessionHint } = useAuth();

  // ✅ Might be logged in — show minimal spinner while API verifies
  if (!isInitialized && hasSessionHint) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user && role === "STUDENT") {
    return <Navigate to="/auth/user/accommodation" replace />;
  }
  if (user && role === "ADMIN") {
    return <Navigate to="/auth/admin/dashboard" replace />;
  }
  if (user && role === "LANDOWNER") {
    return <Navigate to="/auth/landowner/dashboard" replace />;
  }

  return <Outlet />;
}
// PublicRoute.jsx
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