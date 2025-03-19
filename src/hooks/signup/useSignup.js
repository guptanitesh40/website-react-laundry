import toast from "react-hot-toast";
import { useState } from "react";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;

  const signup = async (formData) => {
    let newFormData = {
      ...formData,
      gender: Number(formData.gender),
      role_id: Number(formData.role_id),
    };
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFormData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Signup successful!", {
          className: "toast-success",
        });
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("user", JSON.stringify(data?.data?.user));
        return data?.data;
      } else {
        toast.error(
          data.message ||
            "An error occurred during signup. Please try again later.",
          {
            className: "toast-error",
          }
        );
      }
    } catch {
      toast.error(
        "Failed to signup. Please check your connection and try again.",
        {
          className: "toast-error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;
