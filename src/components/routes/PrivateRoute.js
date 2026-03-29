import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AccommodationDetailsSkeleton from "../../pages/skeleton/AccommodationDetailsSkeleton";

export default function PrivateRoute() {
  const { user, role, isInitialized, hasSessionHint } = useAuth();

  // ✅ Was logged in before — show skeleton while API verifies
  if (!isInitialized && hasSessionHint) {
    return <AccommodationDetailsSkeleton />;
  }

  // ✅ No session hint — never logged in, go to signin instantly
  if (!isInitialized && !hasSessionHint) {
    return <Navigate to="/signin" replace />;
  }

  if (!user || role !== "STUDENT") {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function PrivateRoute() {
//   const { user, role, isInitialized ,loading  } = useAuth();
//   console.log('[PrivateRoute] 🛡️ State:', { user, role, isInitialized, loading });

//   if (!isInitialized) {
//     console.log('[PrivateRoute] ⏳ Not initialized yet, showing loading');
//     return <>loading...</>; // still checking auth, don't decide yet
//   }

//   if (!user || role !== "STUDENT") {
//     console.log('[PrivateRoute] 🚫 No user or wrong role — redirecting to /signin');
//     return <Navigate to="/signin" replace />;
//   }
//   console.log('[PrivateRoute] ✅ Authorized, rendering Outlet');
//   return <Outlet />;
// }


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