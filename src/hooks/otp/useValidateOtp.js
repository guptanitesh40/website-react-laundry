import { useState } from "react";
import toast from "react-hot-toast";

const useValidateOtp = () => {
  const [loading, setLoading] = useState("");
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const validateOtp = async (otp, mobile_number) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/user/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mobile_number,
          otp,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        return { success: true };
      } else {
        toast.error(data.message, {
          className: "toast-error",
        });
        return { success: false };
      }
    } catch {
      toast.error("Failed to validate otp!", {
        className: "toast-error",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };
  return { validateOtp, loading };
};

export default useValidateOtp;
