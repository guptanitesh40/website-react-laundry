import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useFetchDueOrders = (currentPage) => {
  const [dueData, setDueData] = useState({});
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = window.localStorage.getItem("token");

  if (!token) {
    toast.error("user is not authenticated", {
      className: "toast-error",
    });
  }

  useEffect(() => {
    const fetchDueOrders = async () => {
      try {
        const response = await fetch(
          `${baseURL}/orders/invoice-list?per_page=10&page_number=${currentPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setDueData(data?.data);
        } else {
          toast.error("Failed to fetch due orders, please try again!", {
            className: "toast-error",
          });
        }
      } catch {
        toast.error("Something went wrong! Please try again.", {
          className: "toast-error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDueOrders();
  }, [baseURL, token, currentPage]);
  return { dueData, loading };
};

export default useFetchDueOrders;
