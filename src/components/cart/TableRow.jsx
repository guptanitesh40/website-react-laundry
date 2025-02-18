import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import useDeleteProduct from "../../hooks/newCart/useDeleteProduct";
import { useDispatch } from "react-redux";
import { addDescription, deleteItem } from "../../redux/slices/cartSlice";
import { updateQty } from "../../redux/slices/cartSlice";
import useUpdateCart from "../../hooks/newCart/useUpdateCart";

const TableRow = ({ item }) => {
  const dispatch = useDispatch();
  const { deleteProduct, loading: loadingDelProduct } = useDeleteProduct();
  const { updateCart } = useUpdateCart();

  const [loadingQuantityUpdate, setLoadingQuantityUpdate] = useState(false);
  const [loadingDescriptionSave, setLoadingDescriptionSave] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const [isOpen, setIsOpen] = useState(false);
  const [isDescAdded, setIsDescAdded] = useState(false);
  const [itemDescription, setItemDescription] = useState("");
  const {
    product_image,
    cart_id,
    product_name,
    service_name,
    price,
    description,
  } = item;

  const handleUpClick = async () => {
    setLoadingQuantityUpdate(true);
    let newQuantity = quantity + 1;
    setQuantity(newQuantity);

    const result = await updateCart(cart_id, {
      quantity: newQuantity,
    });
    if (result) {
      dispatch(updateQty({ cart_id, quantity: newQuantity }));
    }
    setLoadingQuantityUpdate(false);
  };

  const handleDownClick = async () => {
    setLoadingQuantityUpdate(true);
    if (quantity > 1) {
      let newQuantity = quantity - 1;
      setQuantity(newQuantity);
      const result = await updateCart(cart_id, {
        quantity: newQuantity,
      });
      if (result) {
        dispatch(updateQty({ cart_id, quantity: newQuantity }));
      }
    } else {
      const result = await deleteProduct(cart_id);
      if (result) {
        dispatch(deleteItem(cart_id));
      }
    }
    setLoadingQuantityUpdate(false);
  };

  const handleDelClick = async () => {
    const result = await deleteProduct(cart_id);
    if (result) {
      dispatch(deleteItem(cart_id));
    }
  };

  const handleSave = async () => {
    setLoadingDescriptionSave(true);
    const result = await updateCart(cart_id, { description: itemDescription });
    if (result) {
      dispatch(addDescription({ cart_id, itemDescription }));
      setIsOpen(false);
      setIsDescAdded(true);
    }
    setLoadingDescriptionSave(false);
  };

  useEffect(() => {
    if (item?.description) {
      setItemDescription(item?.description);
      setIsDescAdded(true);
    }
  }, [item?.description]);

  return (
    <tr>
      <td className="items-detail-cell space-y-1 tab-l:space-y-0">
        <h3>{product_name}</h3>
        <p>{service_name}</p>
        {description && !isOpen ? (
          <p>
            {description.length > 20
              ? description.slice(0, 20) + "..."
              : description}
          </p>
        ) : (
          ""
        )}
      </td>
      <td className="text-center">
        <img
          src={product_image}
          alt="Product Image"
          className="inline-block w-32 h-32 rounded-lg border laptop-l:h-28 laptop-l:w-28 laptop-md:h-24 laptop-md:w-24 laptop-m:rounded-md laptop:rounded tab-s:h-[5.5rem] tab-s:w-[5.5rem]"
        />
      </td>
      <td className="text-center">₹{price}</td>
      <td>
        <span className="flex justify-center items-center">
          <button className="inc-dec-btn overflow-hidden new-add-btn">
            {loadingQuantityUpdate ? (
              <span className="h-[4.1rem] w-[9.1rem] flex justify-center items-center laptop-l:w-[8.4rem] laptop-l:h-[3.9rem] laptop-md:w-[6.9rem] laptop-md:h-[3.3rem] laptop-m:w-[6.8rem] laptop:h-[3.1rem] tab-l:-[7rem] tab-m:w-[6.1rem] tab-s:w-20 tab-s:h-10">
                <span className="inline-block h-10 w-10 rounded-full border-4 border-gray-200 border-t-[var(--secondary)] animate-spin tab-s:h-8 tab-s:w-8 tab-s:border-[3px]"></span>
              </span>
            ) : (
              <>
                <span
                  className="py-[1.1rem] pl-[1.2rem] cursor-pointer laptop-l:py-[1rem] laptop-l:pl-[1.1rem] laptop-md:py-[0.85rem] laptop-md:pl-4 laptop:py-3 laptop:pl-3"
                  onClick={() => handleDownClick(cart_id)}
                >
                  <HiOutlineMinus className="indec-icon" />
                </span>
                {quantity}
                <span
                  className="py-[1.1rem] pr-[1.2rem] cursor-pointer laptop-l:py-[1rem] laptop-l:pr-[1.2rem] laptop-md:py-[0.85rem] laptop-md:pr-4 laptop:py-3 laptop:pr-3"
                  onClick={() => handleUpClick(cart_id)}
                >
                  <HiOutlinePlus className="indec-icon" />
                </span>
              </>
            )}
          </button>
        </span>
      </td>
      <td className="text-center">₹{price * quantity}</td>
      <td className="flex justify-around items-start laptop-l:justify-center laptop-l:gap-8 tab-l:gap-6">
        <span
          role="button"
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 bg-[rgba(103,113,130,0.2)] rounded-full flex justify-center items-center cursor-pointer laptop-l:h-12 laptop-l:w-12"
        >
          <FaRegEdit className="inline-block h-8 w-8 fill-[var(--primary)] laptop-l:h-6 laptop-l:w-6" />
        </span>

        <span
          className="h-14 w-14 bg-[rgba(103,113,130,0.2)] rounded-full flex justify-center items-center cursor-pointer laptop-l:h-12 laptop-l:w-12"
          onClick={() => handleDelClick(cart_id)}
        >
          {loadingDelProduct ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-9 h-9 text-white animate-spin fill-blue-600 laptop-l:h-8 laptop-l:w-8"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <FaTrash className="inline-block h-8 w-8 fill-[var(--secondary)] laptop-l:h-6 laptop-l:w-6" />
          )}
        </span>
      </td>
      {isOpen && (
        <td className="description-cell col-span-full">
          <div className="relative">
            <textarea
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              rows="2"
              placeholder="Description"
            ></textarea>
            <button
              aria-label="save-description"
              className="save-description"
              onClick={handleSave}
              disabled={loadingDescriptionSave}
            >
              {loadingDescriptionSave ? "saving.." : "save"}
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

TableRow.propTypes = {
  item: PropTypes.shape({
    product_image: PropTypes.string.isRequired,
    cart_id: PropTypes.number.isRequired,
    product_name: PropTypes.string.isRequired,
    service_name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default TableRow;
