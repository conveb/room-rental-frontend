import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signinAPI } from "../../services/allAPI";


export const useSignin = () => {
  const navigate = useNavigate();
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

      if (!res || !res.data) {
        throw new Error("Login failed");
      }
      console.log("LOGIN SUCCESS:", res.data);

      if (res.data.role === "STUDENT") {
        navigate("/user");
      } else if (res.data.role === "LANDOWNER") {
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

  return { signin, loading, error };
};
