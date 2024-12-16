import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteAddress = () => {
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const deleteAddress = async (address_id) => {
    if (!address_id) {
      toast.error("Address Id is required to delete address");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/address/${address_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data?.message);
        return data?.data;
      } else {
        return null;
      }
    } catch {
      toast.error("Unable to delete address, please try again later!");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deleteAddress, loading };
};

export default useDeleteAddress;
