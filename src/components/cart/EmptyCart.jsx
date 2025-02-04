import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[38rem] flex flex-col items-center gap-5 justify-center laptop-l:max-w-[36rem] laptop-l:gap-4 laptop-md:max-w-[34rem] laptop:max-w-[32rem] laptop:gap-3 laptop-s:max-w-[30rem] tab-m:w-[27.5rem] tab-s:max-w-[25rem] tab:max-w-[22.5rem] mb:max-w-[20rem] mb:gap-2">
        <img src="empty-cart.png" className="w-full h-auto object-cover" />
        <h1
          className="text-5xl font-semibold text-[var(--black)] laptop-l:text-4xl laptop-md:text-3xl tab:text-2xl"
          aria-label="Empty Cart"
        >
          Your cart is empty
        </h1>

        <p className="text-[2rem] text-gray-500 laptop-l:text-[1.8rem] laptop-md:text-[1.6rem] tab:text-[1.4rem]">
          Add item&apos;s to it now.
        </p>

        <Link
          to="/services"
          className="mt-4 flex gap-6 items-center px-8 py-4 border border-transparent text-3xl font-medium rounded-md text-white bg-primary focus:outline-none transition-colors duration-200 laptop-l:py-3 laptop-l:px-6 laptop-l:text-2xl laptop-md:mt-2 laptop-md:text-xl laptop-md:py-2 laptop-md:px-4 laptop-md:gap-4 laptop-s:gap-3 tab:px-3 tab:text-lg mb-l:rounded"
          aria-label="Start shopping"
          title="Start shopping"
        >
          <FiShoppingCart className="h-12 w-auto laptop-l:h-10 laptop-md:h-8 tab:h-6" />
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
