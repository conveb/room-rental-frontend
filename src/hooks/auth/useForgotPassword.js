import { useState } from "react";
import {
    forgotPasswordApi,
} from "../../services/allAPI";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const forgotPassword = async(payload)=>{
    try{
        setLoading(true);
        setError("");
        return await forgotPasswordApi(payload);
    }catch(err){
        setError(
        err?.response?.data?.email ||
        err?.response?.data?.detail ||
        "Password Updating Failed"
      );
      throw err;
    }finally {
      setLoading(false);
    }
  };
  

  return {
    forgotPassword,
    loading,
    error,
  };
};
