import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Cart = () => {
  const subTotal = useSelector((state) => state?.cart?.subTotal);
  const shippingCharge = useSelector(
    (state) => state?.shipping?.shippingInfo?.shipping_charge
  );
  return (
    <>
      <div className="card-container">
        <h5 className="cart-title">cart</h5>
        <div className="px-12 py-12 flex flex-col gap-10 laptop-l:px-10 laptop-l:gap-9 laptop-m:px-8 laptop-m:py-10 laptop-m:gap-8">
          <div className="place-center">
            <p>Sub Total</p>
            <h5>₹{subTotal ? subTotal : 0}</h5>
          </div>
          <div className="place-center">
            <p>Shipping Charge</p>
            <h5>₹{shippingCharge ? shippingCharge : 0}</h5>
          </div>
          <span className="line"></span>
          <div className="place-center total-container">
            <p>Total</p>
            <h5>
              ₹
              {subTotal && shippingCharge
                ? Number(subTotal) + Number(shippingCharge)
                : 0}
            </h5>
          </div>
          <Link to="/cart" className="view-cart-btn">
            view cart
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
