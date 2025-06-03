import "./cart.css";
import { useState } from "react";
import Main from "./Main";
import AddAddress from "./AddAddress";
import AddInstruction from "./AddInstruction";
import PayementMethod from "./PayementMethod";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";
import Branches from "./Branches";

const Cart = () => {
  const cartItemCount = useSelector((state) => state.cart.cartItemCount);
  const [instruction, setInstruction] = useState("");
  const [paymentMethod, setPayementMethod] = useState(0);
  const [selectedAddId, setSelectAddId] = useState(0);
  const [selectedBranchId, setSelectedBranchId] = useState(0);
  const [noSelection, setNoSelection] = useState(false);

  return (
    <section className="section-cart">
      <div className="cart-container">
        {cartItemCount ? (
          <div className="flex justify-between items-start laptop-l:gap-28 laptop-md:gap-24 laptop-m:gap-20 laptop-s:gap-14 tab-m:gap-12 tab-m:flex-col tab-l:items-stretch">
            <div className="basis-[65%] laptop-l:grow">
              <div className="flex flex-col gap-24 laptop-l:gap-20 laptop-md:gap-16 laptop-m:gap-14 tab-l:gap-12 tab-s:gap-10">
                <Main />
                <AddAddress setSelectAddId={setSelectAddId} />
                <AddInstruction
                  instruction={instruction}
                  setInstruction={setInstruction}
                />
                <Branches
                  setSelectedBranchId={setSelectedBranchId}
                  noSelection={noSelection}
                  setNoSelection={setNoSelection}
                />
                <PayementMethod
                  setPayementMethod={setPayementMethod}
                  paymentMethod={paymentMethod}
                />
              </div>
            </div>
            <div className="basis-[31%] relative sticky-summary laptop-l:basis-[28%] laptop-s:basis-[30%] tab-l:basis-[31%] tab-m:w-[35rem] mb-l:w-full">
              <div className=" border border-[#b9bccf4d] rounded-xl laptop-l:rounded-lg">
                <OrderSummary
                  instruction={instruction}
                  paymentMethod={paymentMethod}
                  selectedAddId={selectedAddId}
                  selectedBranchId={selectedBranchId}
                  setNoSelection={setNoSelection}
                />
              </div>
              <div
                role="note"
                aria-label="Note"
                className="para2 mt-5 text-[1.6rem] text-gray-700 dark:text-gray-300 italic"
              >
                <strong className="not-italic font-semibold text-red-500">Note:</strong>
                &nbsp; All prices are subject to change based on the quality of
                clothes and the required labor work.
              </div>
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
