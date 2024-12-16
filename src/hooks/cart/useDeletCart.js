import toast from "react-hot-toast";

const useDeletCart = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const deleteCart = async (cartId) => {
    try {
      const response = await fetch(`${baseURL}/carts/${cartId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message, {
          style: {
            maxWidth: "400px",
          },
        });
        return data;
      } else {
        toast.error("Unable to delete item from cart!");
        return null;
      }
    } catch {
      toast.error("Unable to delete item from cart!");
      return null;
    }
  };

  return { deleteCart };
};

export default useDeletCart;
