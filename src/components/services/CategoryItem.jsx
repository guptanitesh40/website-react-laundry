import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import useAddToCart from "../../hooks/cart/useAddToCart";
import toast from "react-hot-toast";
import useUpdateCart from "../../hooks/cart/useUpdateCart";
import useDeletCart from "../../hooks/cart/useDeletCart";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useReFetchCart from "../../hooks/newCart/useReFetchCart";
import { updateQty } from "../../redux/slices/cartSlice";

const CategoryItem = ({ categoryItem, category_id }) => {
  const { loading: loadingReFetchCart, refetch: refetchCart } =
    useReFetchCart();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = useState(1);
  const [cartId, setCartId] = useState(null);
  const [numberBtn, setNumberBtn] = useState(false);
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  const { addToCart } = useAddToCart();
  const { updateCart } = useUpdateCart();
  const { deleteCart } = useDeletCart();

  const onIncClick = async () => {
    setItemCount(itemCount + 1);
    const newQuantity = itemCount + 1;
    const result = await updateCart(newQuantity, cartId);

    if (result) {
      dispatch(updateQty({ cart_id: cartId, newQuantity }));
    }
  };

  const onDecClick = async () => {
    if (itemCount > 0 && itemCount - 1 != 0) {
      setItemCount(itemCount - 1);
      const newQuantity = itemCount - 1;
      const result = await updateCart(newQuantity, cartId);

      if (result) {
        dispatch(updateQty({ cart_id: cartId, newQuantity }));
      }
    } else {
      setNumberBtn(false);
      const result = await deleteCart(cartId);
      if (result) {
        await refetchCart();
      }
    }
  };

  const handleBtnClick = async (product_id, service_id) => {
    if (!isAuthenticated) {
      setModelIsOpen(true);
    } else {
      setNumberBtn(true);
      const result = await addToCart({
        category_id,
        product_id,
        service_id,
        itemCount,
      });
      if (result) {
        setCartId(result);
        await refetchCart();
      } else {
        toast.error("Failed to add item into cart!");
      }
    }
  };

  const closeModal = () => {
    setModelIsOpen(false);
  };

  const handelLoginClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (categoryItem?.carts) {
      setCartId(categoryItem?.carts?.cart_id);
      setItemCount(categoryItem?.carts?.quantity);
      setNumberBtn(true);
    } else {
      setNumberBtn(false);
      setItemCount(1);
    }
  }, [categoryItem]);

  return (
    <div className="overflow-hidden">
      <div
        key={categoryItem.product_id}
        className="cat-item-container flex gap-8 laptop-l:gap-6 laptop-m:gap-4"
      >
        <img
          src={categoryItem.product.image}
          alt="Service Image"
          className="h-32 w-32 rounded-2xl laptop-l:h-28 laptop-l:w-28 laptop-m:h-24 laptop-m:w-24 laptop:h-20 laptop:w-20"
        />
        <div className="flex-grow flex justify-between items-center">
          <div className="flex flex-col gap-6 laptop-l:gap-4">
            <h5 className="cat-item-name">{categoryItem.product.name}</h5>
            <p className="cat-item-price">₹{categoryItem.price}</p>
          </div>
          {numberBtn ? (
            <button className="inc-dec-btn overflow-hidden">
              <span
                className="py-[1.1rem] pl-[1.2rem] cursor-pointer"
                onClick={onDecClick}
              >
                <HiOutlineMinus className="indec-icon" />
              </span>
              {itemCount}
              <span
                className="py-[1.1rem] pr-[1.2rem] cursor-pointer"
                onClick={onIncClick}
              >
                <HiOutlinePlus className="indec-icon" />
              </span>
            </button>
          ) : (
            <button
              className="add-btn"
              onClick={() =>
                handleBtnClick(categoryItem.product_id, categoryItem.service_id)
              }
            >
              Add
            </button>
          )}
        </div>
      </div>
      {modelIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="info-login-container">
            <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Login Required
            </h2>
            <p className=" text-red-500">
              Please login to add items to your cart.
            </p>
            <div className="flex justify-between">
              <button
                onClick={handelLoginClick}
                className="py-4 px-8 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-400"
              >
                Login
              </button>
              <button
                onClick={closeModal}
                className="py-4 px-8 rounded-xl bg-[#e4e6eb] font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CategoryItem.propTypes = {
  categoryItem: PropTypes.shape({
    carts: PropTypes.oneOfType([
      PropTypes.shape({
        cart_id: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      }),
      PropTypes.string,
    ]),
    price: PropTypes.number.isRequired,
    service_id: PropTypes.number.isRequired,
    product_id: PropTypes.number.isRequired,
    product: PropTypes.shape({
      product_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  category_id: PropTypes.number.isRequired,
};

export default CategoryItem;
