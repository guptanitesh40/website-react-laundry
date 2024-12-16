import PropTypes from "prop-types";
import { useState } from "react";
import usePlaceOrder from "../../hooks/order/usePlaceOrder";
import { useNavigate } from "react-router-dom";
import useApplyCoupon from "../../hooks/coupon/useApplyCoupon";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearCart } from "../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";

const OrderSummary = ({ instruction, paymentMethod, selectedAddId }) => {
  const dispatch = useDispatch();
  const subTotal = useSelector((state) => state.cart.subTotal);
  const items = useSelector((state) => state.cart.cartItems);
  const shippingCharge = parseInt(
    useSelector((state) => state?.shipping?.shippingInfo?.shipping_charge)
  );
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState({
    code: "",
    status: "",
  });
  const { applyCoupon } = useApplyCoupon();
  const { placeOrder, loading } = usePlaceOrder();

  const handleApplyClick = async (e) => {
    e.preventDefault();
    const result = await applyCoupon(subTotal, couponCode.toUpperCase());
    if (result) {
      setDiscountValue(result?.discountAmount);
      setIsCouponApplied({
        code: couponCode.toUpperCase(),
        status: true,
      });
    }
  };

  const handleCheckout = async () => {
    if (!paymentMethod && !selectedAddId) {
      toast.error("Please select Payment Method and Shipping Address");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select Payment Method");
      return;
    }

    if (!selectedAddId) {
      toast.error("Please select Shipping Address");
      return;
    }
    let newSubTotal = subTotal - discountValue;
    const result = await placeOrder(
      items,
      newSubTotal,
      instruction,
      isCouponApplied.code,
      shippingCharge,
      paymentMethod,
      selectedAddId
    );
    if (result) {
      dispatch(clearCart());
      navigate("/order", { state: { result } });
    }
  };

  const handleRemoveCoupon = () => {
    setIsCouponApplied({
      code: "",
      status: false,
    });
    setCouponCode("");
    setDiscountValue(0);
  };

  return (
    <div className="flex flex-col">
      <h4 className="cart-title">Order Summary</h4>
      <form
        onSubmit={handleApplyClick}
        className="flex items-center gap-8 p-10 border-b border-[#b9bccf4d]"
      >
        <div className="grow relative">
          <input
            type="text"
            placeholder="Add Coupon Code"
            aria-label="Add Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full uppercase border border-[#EFF3FF] rounded-xl text-[1.8rem] leading-10 py-5 px-4 focus:ring-0 placeholder:lowercase"
          ></input>
          {isCouponApplied.status && (
            <span
              className="clear-btn"
              role="button"
              aria-label="remove coupon code"
              onClick={handleRemoveCoupon}
            >
              <RxCross2 className="h-full w-full p-1 text-[var(--primary)]" />
            </span>
          )}
        </div>
        <button
          type="submit"
          className={`apply-btn ${
            isCouponApplied.status ? "disabled-apply-btn" : ""
          }`}
          disabled={isCouponApplied.status}
        >
          Apply
        </button>
      </form>
      <div className="px-12 py-12 flex flex-col gap-12">
        <div className="place-center">
          <p>Sub Total</p>
          <h5>₹{subTotal}</h5>
        </div>
        <div className="place-center">
          <p>
            Applied Coupon
            {isCouponApplied.status && (
              <span className="applied-coupon">
                {`[ ${isCouponApplied?.code} ]`}
              </span>
            )}
          </p>
          <h5>₹{discountValue}</h5>
        </div>
        <div className="place-center">
          <p>Shipping Charge</p>
          <h5>₹{shippingCharge}</h5>
        </div>
        <span className="line"></span>
        <div className="place-center total-container">
          <p>Total</p>
          <h5>
            ₹{Number(subTotal) - Number(discountValue) + Number(shippingCharge)}
          </h5>
        </div>
        <button
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <span className="spinner"></span>
            </div>
          ) : (
            "checkout"
          )}
        </button>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  instruction: PropTypes.string.isRequired,
  paymentMethod: PropTypes.number.isRequired,
  selectedAddId: PropTypes.number.isRequired,
};

export default OrderSummary;
