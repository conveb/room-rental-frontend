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

    // Frontend validation
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

    try {
      setLoading(true);
      const res = await signinAPI(payload);

        if (!res?.access) {
        throw new Error(
          res?.detail || "No active account found with the given credentials"
        );
      }


      navigate("/");
    } catch (err) {

      const message =
        err?.detail || err?.message || "Invalid email or password";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { signin, loading, error };
};
