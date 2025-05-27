import { useState } from "react";
import toast from "react-hot-toast";

const useGetAllCoupon = () => {
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const getAllCoupon = async () => {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/customer/coupon?coupon_type=1`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCoupons(data?.data);
      } else {
        toast.error("Failed to fetch coupons. Please try again later.", {
          className: "toast-error",
        });
        setCoupons([]);
      }
    } catch {
      toast.error(
        "Network error. Please check your connection and try again.",
        {
          className: "toast-error",
        }
      );
      setCoupons([]);
    } finally {
      setLoading(false);
    }
  };

  return { getAllCoupon, loading, coupons };
};

export default useGetAllCoupon;
