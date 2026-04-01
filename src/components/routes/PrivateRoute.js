import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute() {
  const { user, role, isInitialized, isFetching, hasSessionHint } = useAuth();

  // ✅ Not initialized yet AND has session hint
  // Only happens on very first load (no cache at all)
  if (!isInitialized && hasSessionHint) {
    return null;  // wait silently — but only this one time ever
  }

  // ✅ Not initialized, no hint — definitely not logged in
  if (!isInitialized && !hasSessionHint) {
    return <Navigate to="/signin" replace />;
  }

  // ✅ INITIALIZED — we have data (cached or fresh)
  // isFetching may be true (silent re-verify in background) but we don't block
  if (!user || role !== "STUDENT") {
    return <Navigate to="/signin" replace />;
  }

  // ✅ Show the page immediately — auth verify happens silently behind it
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