import { useState } from "react";
import toast from "react-hot-toast";

const useGenerateOtp = () => {
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;

  const generateOtp = async (mobile_number) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/user/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile_number,
          type: 1,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "OTP sent successfully!", {
          className: "toast-success",
        });
      } else {
        toast.error(
          data?.message || "Unable to send OTP. Please try again later.",
          {
            className: "toast-error",
          }
        );
      }
    } catch {
      toast.error("Failed to send OTP. Please try again later.", {
        className: "toast-error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { generateOtp, loading };
};

export default useGenerateOtp;
