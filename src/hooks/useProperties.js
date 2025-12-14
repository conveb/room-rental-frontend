// src/hooks/useProperties.js
import { useState, useEffect } from "react";

// Assuming you have 'commonAPI' and 'baseUrl' imported or defined elsewhere
// For example:
// import { commonAPI, baseUrl } from "../services/allAPIs";

export const useProperties = (apiCall) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Inside useProperties.js
const fetchData = async () => {
  try {
    setLoading(true);
    const result = await apiCall(); 
    
    console.log("Full API Response:", result); // <-- ADD THIS

    if (result && (result.status >= 200 && result.status < 300)) {
      setData(result.data);
    } else {
      setError(`Server responded with status: ${result?.status || 'Unknown'}`);
    }
  } catch (err) {
    console.error("Network/Request Error:", err);
    setError("Failed to connect to the server.");
  } finally {
    setLoading(false);
  }
};

    fetchData();
  }, [apiCall]); // Re-run if apiCall changes (though typically it's static)

  return { data, loading, error, setData }; // setData is exposed for manual filtering later
};