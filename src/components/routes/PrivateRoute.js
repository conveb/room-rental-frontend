import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute() {
  const { user, role, isInitialized, hasSessionHint } = useAuth();

  console.log("[PrivateRoute] 🛡️ State:", { user, role, isInitialized, hasSessionHint });

  if (!isInitialized) {
    // ✅ Was logged in before — show nothing while re-verifying
    // Avoids flash of "loading..." text on mobile tab resume
    if (hasSessionHint) {
      console.log("[PrivateRoute] ⏳ Has session hint — waiting silently");
      return null;
    }
    // Never logged in — go to signin immediately
    console.log("[PrivateRoute] 🚫 No session hint — redirecting to signin");
    return <Navigate to="/signin" replace />;
  }

  if (!user || role !== "STUDENT") {
    console.log("[PrivateRoute] 🚫 Unauthorized — redirecting to signin");
    return <Navigate to="/signin" replace />;
  }

  console.log("[PrivateRoute] ✅ Authorized");
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