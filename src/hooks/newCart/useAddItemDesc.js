import { useState } from "react";
import toast from "react-hot-toast";

const useAddItemDesc = () => {
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const addItemDesc = async (cart_id, description) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/carts/${cart_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        toast.error("Failed to add item description!");
        return null;
      }
    } catch {
      toast.error("Failed to add item description!");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addItemDesc, loading };
};

export default useAddItemDesc;
