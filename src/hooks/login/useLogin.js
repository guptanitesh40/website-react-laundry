import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const role_id = 5;

  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          role_id: role_id,
        }),
      });

      const data = await response.json();

      if (data.statusCode == 200) {
        toast.success(data.message || "user login successful!", {
          className: "toast-success",
        });
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/");
        return data.data;
      } else {
        toast.error(
          "Invalid credentials. Please check your username and password.",
          {
            className: "toast-error",
          }
        );
      }
    } catch {
      toast.error(
        "Oops! Something went wrong during the login process. Please try again.",
        {
          className: "toast-error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
