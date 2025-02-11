import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useFetchBranches = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = window.localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch(`${baseURL}/branches/list`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          toast.error("Failed to fetch branches.", {
            className: "toast-error",
          });
          return;
        }

        const data = await response.json();
        setBranches(data?.data || []);
      } catch {
        toast.error(
          "Failed to fetch branches. Please check your internet connection.",
          {
            className: "toast-error",
          }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [baseURL, token]);

  return { branches, loading };
};

export default useFetchBranches;
