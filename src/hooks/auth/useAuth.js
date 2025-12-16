import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinAPI } from "../../services/allAPI";
import { isValidEmail, isStrongPassword } from "../../utils/validation";

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signin = async (payload) => {
    setError("");

    // FRONTEND VALIDATION
    if (!payload.email || !payload.password) {
      setError("Email and password are required");
      return;
    }

    if (!isValidEmail(payload.email)) {
      setError("Invalid email format");
      return;
    }

    if (!isStrongPassword(payload.password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, number, and special character"
      );
      return;
    }

    if (!payload.privacy_policy) {
      setError("Please accept the privacy policy");
      return;
    }

    try {
      setLoading(true);

      // 🔥 SUCCESS = REQUEST SUCCEEDS (COOKIES SET)
      const res = await signinAPI(payload);

      if (!res || !res.data) {
        throw new Error("Login failed");
      }

      navigate("/");
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

  return { signin, loading, error };
};
