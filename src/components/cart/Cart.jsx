import "./cart.css";
import { useState } from "react";
import Main from "./Main";
import AddAddress from "./AddAddress";
import AddInstruction from "./AddInstruction";
import PayementMethod from "./PayementMethod";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const cartItemCount = useSelector((state) => state.cart.cartItemCount);
  const [instruction, setInstruction] = useState("");
  const [paymentMethod, setPayementMethod] = useState(0);
  const [selectedAddId, setSelectAddId] = useState(0);

  return (
    <section className="section-cart">
      <div className="secondary-container">
        {cartItemCount ? (
          <div className="flex justify-between items-start">
            <div className="flex-[0_0_63%]">
              <div className="flex flex-col gap-24">
                <Main />
                <AddAddress setSelectAddId={setSelectAddId} />
                <AddInstruction
                  instruction={instruction}
                  setInstruction={setInstruction}
                />
                <PayementMethod setPayementMethod={setPayementMethod} />
              </div>
            </div>
            <div className="flex-[0_0_31%] border border-[#b9bccf4d] rounded-xl sticky-summary">
              <OrderSummary
                instruction={instruction}
                paymentMethod={paymentMethod}
                selectedAddId={selectedAddId}
              />
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </section>
  );
};

export default Cart;
