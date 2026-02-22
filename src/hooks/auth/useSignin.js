
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

      if (!res?.data) {
        throw new Error("Login failed");
      }
      console.log("Signin response:", res.data);
      // After successful login
      localStorage.setItem('aliveparis_session_hint', 'true');

      // ✅ UPDATE GLOBAL AUTH STATE
      await login();

      if (res.data.user.role === "STUDENT") {
        navigate("/auth/user/accommodation");

      } else if (res.data.user.role === "LAND_OWNER") {
        navigate("/auth/landowner");

      } else if (res.data.user.role === "ADMIN") {
        navigate("/auth/admin");

      } else {
        navigate("/");
      }


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
