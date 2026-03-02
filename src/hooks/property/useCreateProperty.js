import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import { createPropertyApi } from "../../services/allAPI";

export const useCreateProperty = () => {
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const createProperty = useCallback(async (values) => {
    // Prevent multiple simultaneous submissions
    if (loading) {
      toast.warning("Already submitting...");
      return;
    }
    
    setLoading(true);
    
    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();
    
    try {
      const formData = new FormData();

      // 1. Append Text fields with type-safe handling
      Object.keys(values).forEach((key) => {
        // Exclude file upload fields and array fields
        if (key !== "images" && 
            key !== "cover_image" && 
            key !== "amenities" && 
            key !== "instructions" && 
            key !== "contract_file") {
          let val = values[key];

          // Skip null/undefined values
          if (val === null || val === undefined) return;

          // Format Date objects to YYYY-MM-DD
          if (val instanceof Date) {
            val = val.toISOString().split('T')[0];
          }

          // Handle Booleans
          if (typeof val === "boolean") {
            val = val ? "true" : "false"; 
          }

          formData.append(key, String(val));
        }
      });

      // Handle instructions array
      if (values.instructions && Array.isArray(values.instructions)) {
        formData.append("instructions", JSON.stringify(values.instructions));
      }

      // 2. Append Files
      if (values.cover_image) {
        formData.append("cover_image", values.cover_image);
      }

      if (values.images && values.images.length > 0) {
        values.images.forEach((file) => {
          formData.append("images", file);
        });
      }

      // Append contract_file PDF file
      if (values.contract_file) {
        formData.append("contract_file", values.contract_file);
      }

      // 3. Append Amenities individually
      if (values.amenities && Array.isArray(values.amenities)) {
        values.amenities.forEach(id => {
          if (id) formData.append("amenities", id);
        });
      }

      // Make API call with abort signal
      const response = await createPropertyApi(formData, {
        signal: abortControllerRef.current.signal
      });
      
      // Single success toast
      toast.success("Property published successfully!");
      return response.data;

    } catch (err) {
      // Don't show errors if request was aborted
      if (err.name === 'AbortError' || err.code === 'ERR_CANCELED') {
        return;
      }
      
      // Handle different error types
      if (err.response && err.response.data) {
        const serverErrors = err.response.data;
        
        // Check if it's a validation error object
        if (typeof serverErrors === 'object') {
          // Collect all error messages into one string
          const errorMessages = [];
          
          Object.entries(serverErrors).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach(msg => {
                errorMessages.push(`${field}: ${msg}`);
              });
            } else if (typeof messages === 'string') {
              errorMessages.push(`${field}: ${messages}`);
            }
          });
          
          // Show all errors in a single toast (limit to first 3 to avoid overflow)
          if (errorMessages.length > 0) {
            const displayErrors = errorMessages.slice(0, 3);
            const remainingCount = errorMessages.length - 3;
            
            const errorText = displayErrors.join('\n') + 
              (remainingCount > 0 ? `\n...and ${remainingCount} more errors` : '');
            
            toast.error(
              <div className="whitespace-pre-line max-h-40 overflow-y-auto">
                {errorText}
              </div>
            );
          } else {
            toast.error("Validation failed. Please check your inputs.");
          }
        } else {
          // Single error message
          toast.error(String(serverErrors));
        }
      } else if (err.message) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
      
      throw err;
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [loading]);

  return { createProperty, loading };
};