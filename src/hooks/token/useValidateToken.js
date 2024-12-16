import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";
import { setAuthStatus } from "../../redux/slices/authSlice";

const useValidateToken = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`${baseURL}/auth/validate-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (response.ok) {
          dispatch(addUser(data?.data));
          dispatch(setAuthStatus(true));
        } else {
          toast.error(data?.message || "Token validation failed!");
          localStorage.clear();
          dispatch(setAuthStatus(false));
        }
      } catch {
        toast.error("Failed to validate user token.");
        dispatch(setAuthStatus(false));
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      validateToken();
    } else {
      setLoading(false);
      dispatch(setAuthStatus(false));
    }
  }, [baseURL, dispatch, navigate, token]);

  return { loading };
};

export default useValidateToken;
