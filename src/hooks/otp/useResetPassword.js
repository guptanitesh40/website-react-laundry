import { useState } from "react";
import toast from "react-hot-toast";

const useResetPassword = () => {
  const role_id = 5;
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const resetPassword = async (mobile_number, otp, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_number: Number(mobile_number),
          otp: Number(otp),
          new_password: password,
          role_id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Password reset successfully", {
          className: "toast-success",
        });
        return { success: true };
      } else {
        toast.error(data.message || "Failed to reset password", {
          className: "toast-error",
        });
        return { success: false };
      }
    } catch {
      toast.error("Failed to reset password", {
        className: "toast-error",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading };
};

export default useResetPassword;
