import PropTypes from "prop-types";
import { BsCreditCard2Back } from "react-icons/bs";
import { FaCcAmazonPay } from "react-icons/fa";

const PayementMethod = ({ setPayementMethod }) => {
  return (
    <form className="flex flex-col gap-12 laptop-l:gap-10">
      <h4 className="cart-sub-title">Select Payment Method</h4>
      <label className="border border-gray-400 cursor-pointer p-6 rounded-md flex justify-between items-center shadow w-[45rem] transition-all duration-300 laptop-md:p-4 laptop-md:w-[38rem] laptop-md:pr-6 laptop:w-[32.5rem]">
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
          onChange={() => {
            setPayementMethod(1);
          }}
        />
      </label>

      <label className="border border-gray-400 cursor-pointer p-6 rounded-md flex justify-between items-center shadow w-[45rem]  transition-all duration-300 laptop-md:p-4 laptop-md:w-[38rem] laptop-md:pr-6 laptop:w-[32.5rem]">
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
          className="styled-radio"
          onChange={() => {
            setPayementMethod(2);
          }}
        />
      </label>
    </form>
  );
};

PayementMethod.propTypes = {
  setPayementMethod: PropTypes.func.isRequired,
};

export default PayementMethod;
