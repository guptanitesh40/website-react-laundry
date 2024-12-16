import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const useReFetchCart = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/carts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setCart(data?.data));
      } else {
        toast.error("Failed to fetch cart data!");
      }
    } catch {
      toast.error("Failed to fetch cart data!");
    } finally {
      setLoading(false);
    }
  }, [baseURL, dispatch, token]);

  return { loading, refetch: fetchCart };
};

export default useReFetchCart;
