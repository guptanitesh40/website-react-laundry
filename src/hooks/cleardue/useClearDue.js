import { useState } from "react";
import toast from "react-hot-toast";

const useClearDue = () => {
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = window.localStorage.getItem("token");

  const clearDue = async (pay_amount, transaction_id, order_ids) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/orders/customer/clear-due`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pay_amount,
          payment_status: 2,
          transaction_id,
          order_ids,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to clear due. Please try again.", {
          className: "toast-error",
        });
        return { status: false };
      }

      toast.success("Due cleared successfully!", {
        className: "toast-success",
      });
      return { status: true };
    } catch {
      toast.error("An unexpected error occurred.", {
        className: "toast-error",
      });
      return { status: false };
    } finally {
      setLoading(false);
    }
  };

  return { clearDue, loading };
};

export default useClearDue;
