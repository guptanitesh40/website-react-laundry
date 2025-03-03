import { useState } from "react";
import toast from "react-hot-toast";

const useEditAddress = () => {
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const editAddress = async (formData, id) => {
    if (!token) {
      toast.error("User is not authenticated!");
      return null;
    }

    const upDatedFormData = {
      ...formData,
      address_type: Number(formData.address_type),
      pincode: String(formData.pincode),
      lat: Number(formData.lat),
      long: Number(formData.long),
    };

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/address/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(upDatedFormData),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        return data;
      } else {
        toast.error(data.message, {
          style: {
            maxWidth: "700px",
          },
        });
        return null;
      }
    } catch {
      toast.error("Unable to update address");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, editAddress };
};

export default useEditAddress;
