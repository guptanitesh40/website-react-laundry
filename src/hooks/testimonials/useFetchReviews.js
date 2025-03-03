import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useFetchReviews = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${baseURL}/feedback/approved?status=2`);

        const data = await response.json();

        if (response.ok) {
          setReviews(data?.data || []);
        } else {
          toast.error("Failed to fetch Reviews.", {
            className: "toast-error",
          });
        }
      } catch {
        toast.error(
          "Network error! Please check your connection and try again.",
          {
            className: "toast-error",
          }
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [baseURL]);

  return { reviews, loading };
};

export default useFetchReviews;
