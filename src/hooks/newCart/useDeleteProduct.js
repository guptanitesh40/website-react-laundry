import toast from "react-hot-toast";
import { useState } from "react";

const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;

  const deleteProduct = async (cartId) => {
    const token = localStorage.getItem("token");

    if (!cartId) {
      toast.error("Cart ID is required to delete an item!");
      return null;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/carts/${cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        toast.error("Failed to delete item from cart!", {
          className: "toast-error",
        });
        return null;
      }
    } catch {
      toast.error("Failed to delete item from cart!", {
        className: "toast-error",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { deleteProduct, loading };
};

export default useDeleteProduct;
