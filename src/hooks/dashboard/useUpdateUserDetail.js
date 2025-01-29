import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateUserDetail = () => {
  const [loading, setLoading] = useState(false);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const updateUserDetail = async (formData) => {
    setLoading(true);
    let newFormData = new FormData();
    newFormData.append("first_name", formData.first_name);
    newFormData.append("last_name", formData.last_name);
    newFormData.append("email", formData.email);
    newFormData.append("mobile_number", formData.mobile_number);
    newFormData.append("gender", formData.gender);

    if (formData.image) {
      newFormData.append("image", formData.image);
    }
    if (formData.id_proof) {
      newFormData.append("id_proof", formData.id_proof);
    }

    try {
      const response = await fetch(`${baseURL}/user/customer`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: newFormData,
      });
      const data = await response.json();

      if (response.ok) {
        toast.success("Your profile details have been successfully updated!", {
          className: "toast-success",
        });
        return data?.data?.user?.updatedData;
      } else {
        toast.error(
          "Unable to update your profile at the moment. Please try again later.",
          {
            className: "toast-error",
          }
        );
        return null;
      }
    } catch {
      toast.error(
        "Profile update failed! Please check the information and try again.",
        {
          className: "toast-error",
        }
      );
      return null;
    } finally {
      setLoading(false);
    }
  };
  return { updateUserDetail, loading };
};

export default useUpdateUserDetail;
