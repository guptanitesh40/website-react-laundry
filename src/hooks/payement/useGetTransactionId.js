import { useState } from "react";
import toast from "react-hot-toast";

const useGetTransactionId = () => {
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const getTransactionId = async (amount) => {
    if (!amount) {
      toast.error("Amount is required to generate the transaction ID.", {
        className: "toast-error",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/razorpay/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error("Failed to create order. Please try again.", {
          className: "toast-error",
        });
        return;
      }
      return data?.data?.razorpay_order_id;
    } catch {
      toast.error(
        "An error occurred while creating the order. Please check your connection.",
        {
          className: "toast-error",
        }
      );
      return;
    } finally {
      setLoading(false);
    }
  };

  return { getTransactionId, loading };
};

export default useGetTransactionId;
