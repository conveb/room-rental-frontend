import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinAPI } from "../../services/allAPI";
import { useAuth } from "../../context/AuthContext";

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


      // ✅ UPDATE GLOBAL AUTH STATE
    await login();


      if (res.data.role === "STUDENT") {
        navigate("/auth/user");

      } else if (res.data.role === "LAND_OWNER") {
        navigate("/landowner");

      } else if (res.data.role === "ADMIN") {
        navigate("/admin");

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

      setError(backendError);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = () => {

  };

  return { signin, loading, error };
};
