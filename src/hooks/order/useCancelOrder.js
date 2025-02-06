import { useState } from "react";
import toast from "react-hot-toast";

const useCancelOrder = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const cancelOrder = async (order_id, text_note) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/orders/cancel-by-customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_id,
          text_note,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data?.message || "Order canceled successfully!", {
          className: "toast-success",
        });
        return { status: true };
      } else {
        toast.error("Failed to cancel the order. Please try again later.", {
          className: "toast-error",
        });
        return { status: false };
      }
    } catch {
      toast.error(
        "Something went wrong while canceling the order. Try again later.",
        {
          className: "toast-error",
        }
      );
      return { status: false };
    } finally {
      setLoading(false);
    }
  };

  return { cancelOrder, loading };
};

export default useCancelOrder;
