import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const usePlaceOrder = () => {
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const user_id = useSelector((state) => state.user.user.user_id);

  const placeOrder = async ({
    items,
    sub_total,
    description = "",
    coupon_code,
    normal_delivery_charges,
    payment_type,
    address_id,
    express_delivery_charges,
    express_delivery_hour,
    transaction_id = "",
    paid_amount = 0,
    branch_id,
    is_quick_order = false,
    company_name, 
    gstin,
  }) => {
    const queryParams = new URLSearchParams();
    if (is_quick_order) {
      queryParams.append("is_quick_order", "true");
    }

    let payment_status = 1;
    if (payment_type === 2 && transaction_id) {
      payment_status = 2;
    }


    const payload = {
      items: Array.isArray(items) ? items : [],
      sub_total: Number(sub_total ?? 0),
      description : description ?? "",
      coupon_code: coupon_code ?? "",
      normal_delivery_charges: Number(normal_delivery_charges ?? 0),
      payment_type: payment_type ?? 1,
      address_id: address_id,
      express_delivery_charges: Number(express_delivery_charges ?? 0),
      express_delivery_hour: express_delivery_hour,
      transaction_id: transaction_id ?? "",
      paid_amount: Number(paid_amount ?? 0),
      branch_id: branch_id,
      payment_status,
      user_id,
      order_status: 1,
      company_name: company_name ?? "",
      gstin: gstin ?? "",
    };

    try {
      setLoading(true);
      const response = await fetch(
        `${baseURL}/orders?${queryParams.toString()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

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
    } catch (err) {
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
