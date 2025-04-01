import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../../redux/slices/addressSlice";
import toast from "react-hot-toast";

const useFetchAddress = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state?.auth?.isAuthenticated);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const fetchAddress = async () => {
    if (!authStatus || !token) {
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${baseURL}/address`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setAddress(data?.data?.result));
      } else {
        toast.error("Failed to fetch address data!");
      }
    } catch {
      toast.error("Failed to fetch address data!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [authStatus, baseURL, dispatch, token]);

  return { loading, fetchAddress };
};

export default useFetchAddress;
