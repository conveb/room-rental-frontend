import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinAPI } from "../../services/allAPI";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

export const useSignin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signin = async (payload) => {
    setError("");

    if (!payload.email || !payload.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await signinAPI(payload);

      if (!res?.data) throw new Error("Login failed");

      if (res.data.require_otp === true) {
        navigate("/verify-otp", {
          state: {
            email: res.data.email || payload.email,
            otp: res.data.otp,
            purpose: "ADMIN_LOGIN",
            requireOtp: true,
          },
          replace: true,
        });
        return;
      }

      // ✅ CHANGED: login() now invalidates TQ cache → triggers AuthAPI refetch
      // role-based navigation reads from the fresh TQ user data
      await login();

      // ✅ read role from signinAPI response directly (TQ refetch is async)
      const role = res.data.user?.role;

      if (role === "STUDENT")         navigate("/auth/user/accommodation");
      else if (role === "LAND_OWNER") navigate("/auth/landowner");
      else if (role === "ADMIN")      navigate("/auth/admin");
      else                            navigate("/");

    } catch (err) {
      const backendError =
        err?.response?.data?.user ||
        err?.response?.data?.email ||
        err?.response?.data?.detail ||
        err?.message ||
        "Invalid email or password";

      if (err?.response?.status === 401) {
        toast.error("Unauthorized access. Please check your credentials.");
      }
      setError(backendError);
    } finally {
      setLoading(false);
    }
  };

  return { signin, loading, error };
};