import PropTypes from "prop-types";
import { useEffect } from "react";
import { BsCreditCard2Back } from "react-icons/bs";
import { FaCcAmazonPay } from "react-icons/fa";

const PayementMethod = ({ setPayementMethod, isPickupClothes }) => {

  useEffect(() => {
    if (isPickupClothes) setPayementMethod(1);
  }, [isPickupClothes]);

  return (
    <form className="flex flex-col gap-12 laptop-l:gap-10 mb-l:gap-8">
      <h4 className="cart-sub-title">
        {isPickupClothes ? "" : "Select"} Payment Method
      </h4>
      <label className="border border-gray-400 cursor-pointer p-6 rounded-xl flex justify-between items-center shadow w-[45rem] transition-all duration-300 laptop-l:rounded-lg laptop-md:p-4 laptop-md:w-[38rem] laptop-md:pr-6 laptop:w-[32.5rem] tab-m:w-[35rem] tab-m:rounded-md mb-l:w-full">
        <div className="flex items-center space-x-5 laptop-l:space-x-6 laptop-md:space-x-4 laptop:space-x-3">
          <div className="flex items-center">
            <BsCreditCard2Back className="inline-block h-12 w-12 fill-[var(black)] laptop-md:h-10 laptop-md:w-10" />
          </div>
          <h2 className="text-[2rem] leading-[1.75] capitalize laptop-l:text-[1.8rem] laptop-md:text-[1.6rem] laptop:text-[1.5rem]">
            Cash On Delivery
          </h2>
        </div>
        <input
          type="radio"
          name="payment"
          className="styled-radio"
          checked={isPickupClothes}
          onChange={() => {
            setPayementMethod(1);
          }}
        />
      </label>
      {!isPickupClothes && (
        <label className="border border-gray-400 cursor-pointer p-6 rounded-xl flex justify-between items-center shadow w-[45rem]  transition-all duration-300 laptop-l:rounded-lg laptop-md:p-4 laptop-md:w-[38rem] laptop-md:pr-6 laptop:w-[32.5rem] tab-m:w-[35rem] tab-m:rounded-md mb-l:w-full">
          <div className="flex items-center space-x-5 laptop-l:space-x-6 laptop-md:space-x-4 laptop:space-x-3">
            <div className="flex items-center">
              <FaCcAmazonPay className="inline-block h-12 w-12 fill-[var(black)] laptop-md:h-10 laptop-md:w-10" />
            </div>
            <h2 className="text-[2rem] leading-[1.75] capitalize laptop-l:text-[1.8rem] laptop-md:text-[1.6rem] laptop:text-[1.5rem]">
              Online Payement
            </h2>
          </div>
          <input
            type="radio"
            name="payment"
            value={2}
            className="styled-radio"
            onChange={() => {
              setPayementMethod(2);
            }}
          />
        </label>
      )}
    </form>
  );
};

PayementMethod.propTypes = {
  setPayementMethod: PropTypes.func.isRequired,
};

export default PayementMethod;
