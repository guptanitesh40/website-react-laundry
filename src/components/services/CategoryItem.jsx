import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import useAddToCart from "../../hooks/newCart/useAddToCart";
import toast from "react-hot-toast";
import useUpdateCart from "../../hooks/newCart/useUpdateCart";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, updateQty } from "../../redux/slices/cartSlice";
import useDeleteProduct from "../../hooks/newCart/useDeleteProduct";
import { addItem } from "../../redux/slices/cartSlice";

const CategoryItem = ({ categoryItem, category_id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [itemCount, setItemCount] = useState(1);
  const [cartId, setCartId] = useState(null);
  const [numberBtn, setNumberBtn] = useState(false);
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  const { addToCart, loading: loadingAddToCart } = useAddToCart();
  const { deleteProduct, loading: loadingDelProduct } = useDeleteProduct();
  const { updateCart, loading: loadingUpdateCart } = useUpdateCart();

  const onIncClick = async () => {
    const quantity = itemCount + 1;
    const result = await updateCart(cartId, { quantity });

    if (result) {
      setItemCount(quantity);
      dispatch(updateQty({ cart_id: cartId, quantity }));
    }
  };

  const onDecClick = async () => {

    if (itemCount > 0 && itemCount - 1 != 0) {
      const quantity = itemCount - 1;
      const result = await updateCart(cartId, { quantity });

      if (result) {
        setItemCount(quantity);
        dispatch(updateQty({ cart_id: cartId, quantity }));
      }
    } else {
      if (cartId) {
        const result = await deleteProduct(cartId);
        if (result) {
          setNumberBtn(false);
          dispatch(deleteItem(cartId));
        }
      }
    }
  };

  const handleBtnClick = async (product_id, service_id) => {
    if (!isAuthenticated) {
      setModelIsOpen(true);
    } else {
      if (itemCount === 0) {
        const quantity = itemCount + 1;
        const result = await updateCart(cartId, { quantity });

        if (result) {
          setItemCount(quantity);
          dispatch(updateQty({ cart_id: cartId, quantity }));
        }
      } else {
        const result = await addToCart({
          category_id,
          product_id,
          service_id,
          itemCount,
        });
        if (result) {
          setCartId(result?.cart_id);
          setNumberBtn(true);
          dispatch(addItem(result));
        } else {
          toast.error("Failed to add item into cart!");
        }
      }
    }
  };

  const closeModal = () => {
    setModelIsOpen(false);
  };

  const handelLoginClick = () => {
    navigate("/login", { state: { from: location.pathname } });
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

  const updateQuantity = async (value) => {
    if (Number(value) === 0) {
      const result = await deleteProduct(cartId);

      if (result) {
        setNumberBtn(false);
        dispatch(deleteItem(cartId));
      }
      return;
    } else {
      const quantity = Number(value);

      const result = await updateCart(cartId, { quantity });

      if (result) {
        setItemCount(quantity);
        dispatch(updateQty({ cart_id: cartId, quantity }));
      }
    }
  };

  return (
    <div>
      <div
        key={categoryItem.product_id}
        className="cat-item-container flex gap-8 laptop-l:gap-6 laptop-m:gap-4 mb:flex-col mb:items-center"
      >
        <img
          src={categoryItem.product.image}
          alt="Service Image"
          className="h-32 w-32 rounded-2xl laptop-l:h-28 laptop-l:w-28 laptop-l:rounded-xl laptop-md:h-24 laptop-md:w-24 laptop-md:rounded-lg laptop:h-20 laptop:w-20 laptop-s:rounded-md tab-l:h-24 tab-l:w-24 tab-l:rounded-lg"
        />
        <div className="flex-grow flex justify-between items-center mb-l:flex-wrap mb:flex-col mb:gap-3">
          <div className="flex flex-col gap-6 laptop-md:gap-5 mb:gap-3 mb:items-center">
            <h5 className="cat-item-name">{categoryItem.product.name}</h5>
            <p className="cat-item-price">₹{categoryItem.price}</p>
          </div>
          {numberBtn ? (
            <button className="inc-dec-btn relative overflow-hidden">
              {loadingUpdateCart || loadingDelProduct ? (
                <span className="h-[4.1rem] w-[8.8rem] flex justify-center items-center laptop-l:h-14 laptop-l:w-[7.5rem] laptop-md:h-[3.2rem] laptop-md:w-[6.2rem]">
                  <span className="inline-block h-8 w-8 rounded-full border-4 border-gray-200 border-t-[var(--secondary)] animate-spin laptop-l:h-6 laptop-l:w-6 laptop-l:border-[3px]"></span>
                </span>
              ) : (
                <>
                  <span
                    className="py-[1.1rem] pl-[1.2rem] laptop-l:pl-3 laptop-l:py-[0.8rem] cursor-pointer"
                    onClick={onDecClick}
                    aria-label="Decrease item count"
                  >
                    <HiOutlineMinus className="indec-icon" />
                  </span>
                  <input
                    type="text"
                    value={itemCount}
                    min="1"
                    onChange={(e) => setItemCount(Number(e.target.value))}
                    onBlur={(e) => updateQuantity(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && updateQuantity(e.target.value)
                    }
                    className="w-12 text-center bg-transparent outline-none"
                  />
                  <span
                    className="py-[1.1rem] pr-[1.2rem] laptop-l:pr-3 laptop-l:py-[0.8rem] cursor-pointer "
                    onClick={onIncClick}
                    aria-label="Increase item count"
                  >
                    <HiOutlinePlus className="indec-icon" />
                  </span>
                </>
              )}
            </button>
          ) : (
            <button
              className="product-add-btn"
              aria-label="Add to cart"
              disabled={loadingAddToCart}
              onClick={() =>
                handleBtnClick(categoryItem.product_id, categoryItem.service_id)
              }
            >
              {loadingAddToCart ? (
                <span className="inline-block mt-[-7.5px] mb-[-7.5px] h-8 w-8 rounded-full border-4 border-gray-200 border-t-[var(--secondary)] animate-spin laptop-l:h-6 laptop-l:w-6 laptop-l:border-[3px] laptop-l:-mt-2 laptop-l:-mb-2 laptop-md:mx-[1px]"></span>
              ) : (
                "Add"
              )}
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
                className="py-4 px-12 rounded-xl bg-indigo-500 text-white font-medium hover:bg-indigo-400"
              >
                Login
              </button>
              <button
                onClick={closeModal}
                className="py-4 px-12 rounded-xl bg-[#e4e6eb] font-medium"
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
