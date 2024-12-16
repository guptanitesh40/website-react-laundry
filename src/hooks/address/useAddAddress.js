import { useState } from "react";
import toast from "react-hot-toast";

const useAddAddress = () => {
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const addAddress = async (formData) => {
    const upDatedFormData = {
      ...formData,
      address_type: Number(formData.address_type),
    };

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/address`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(upDatedFormData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data?.message);
        return data?.data?.result;
      } else {
        toast.error("Failed to add address!");
        return null;
      }
    } catch {
      toast.error("Failed to add address!");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addAddress, loading };
};

export default useAddAddress;
