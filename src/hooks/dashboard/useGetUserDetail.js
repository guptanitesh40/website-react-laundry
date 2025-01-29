import toast from "react-hot-toast";

const useGetUserDetail = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const getUserDetail = async () => {
    try {
      const response = await fetch(`${baseURL}/user/customer`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        return data.data;
      } else {
        toast.error(
          "Unable to retrieve user details. Please try again later.",
          {
            className: "toast-error",
          }
        );
      }
    } catch {
      toast.error(
        "Failed to fetch user information. Please check your connection.",
        {
          className: "toast-error",
        }
      );
    }
  };

  return { getUserDetail };
};

export default useGetUserDetail;
