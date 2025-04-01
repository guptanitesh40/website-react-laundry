import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const usePlaceOrder = () => {
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const user_id = useSelector((state) => state.user.user.user_id);

  const placeOrder = async (
    items,
    sub_total,
    description,
    coupon_code,
    normal_delivery_charges,
    payment_type,
    address_id,
    express_delivery_charges,
    express_delivery_hour,
    transaction_id = "",
    paid_amount = 0,
    branch_id
  ) => {
    let payment_status = 1;
    if (payment_type === 2 && transaction_id) {
      payment_status = 2;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items,
          description,
          coupon_code,
          sub_total,
          normal_delivery_charges,
          payment_type,
          order_status: 1,
          payment_status,
          address_id,
          user_id,
          express_delivery_charges,
          express_delivery_hour,
          transaction_id,
          paid_amount,
          branch_id,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Order placed successfully!", {
          className: "toast-success",
        });
        return data.data;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch {
      toast.error("Failed to place an order!", {
        className: "toast-error",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { placeOrder, loading };
};

export default usePlaceOrder;
