import toast from "react-hot-toast";

const useGetOrders02 = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const getOrders02 = async (page, ascdes, order_by) => {
    try {
      const response =
        !ascdes && !order_by
          ? await fetch(`${baseURL}/orders?per_page=10&page_number=${page}`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          : await fetch(
              `${baseURL}/orders?sort_by=${order_by}&order=${ascdes.toUpperCase()}&per_page=10&page_number=${page}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
      const data = await response.json();
      if (response.ok) {
        return data.data;
      } else {
        toast.error(
          "Failed to fetch orders. Please check your connection and try again.",
          {
            className: "toast-error",
          }
        );
        return false;
      }
    } catch {
      toast.error("Failed to retrieve your orders. Please try again later.", {
        className: "toast-error",
      });
      return false;
    }
  };

  return { getOrders02 };
};

export default useGetOrders02;
