import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAddress } from "../../redux/slices/addressSlice";

const useFetchAddress = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAddress = async () => {
      if (!token) {
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

    fetchAddress();
  }, [baseURL, dispatch, token]);

  return { loading };
};

export default useFetchAddress;
