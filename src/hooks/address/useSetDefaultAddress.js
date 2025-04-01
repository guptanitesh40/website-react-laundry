import { useState } from "react";
import toast from "react-hot-toast";

const useSetDefaultAddress = () => {
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const setDefaultAddress = async (addressId) => {
    if (!addressId) {
      toast.error("Address Id is required to delete address");
      return;
    }

    const defaultAddress = {
      address_id: addressId,
    };

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/address/set-default`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(defaultAddress),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data?.message || "Default address setted successfully");
        return data?.data;
      } else {
        return null;
      }
    } catch {
      toast.error("Fail to set default address, please try again later!");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { setDefaultAddress, loading };
};

export default useSetDefaultAddress;
