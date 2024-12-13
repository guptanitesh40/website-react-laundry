import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";

const useFetchCart = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
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
    };

    fetchCart();
  }, [baseURL, dispatch, token]);

  return { loading };
};

export default useFetchCart;
