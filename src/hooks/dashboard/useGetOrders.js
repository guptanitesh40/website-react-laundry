import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetOrders = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    const token = localStorage.getItem("token");

    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        return data?.data;
      } else {
        toast.error("Failed to retrieve your orders. Please try again later.", {
          className: "toast-error",
        });

        return false;
      }
    } catch {
      toast.error(
        "Failed to fetch orders. Please check your connection and try again.",
        {
          className: "toast-error",
        }
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { getOrders, loading };
};

export default useGetOrders;
