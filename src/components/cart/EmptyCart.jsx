import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-[38rem] flex flex-col items-center gap-4 justify-center">
        <img
          src="empty-cart.png"
          className="w-full h-auto object-cover rounded-lg"
        />

        <h1
          className="text-5xl font-semibold text-[var(--black)]"
          aria-label="Empty Cart"
        >
          Your cart is empty
        </h1>

        <p className="text-[2rem] text-gray-500">Add item&apos;s to it now.</p>

        <Link
          to="/services"
          className="mt-4 flex gap-6 items-center px-8 py-4 border border-transparent text-3xl font-medium rounded-md text-white bg-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] transition-colors duration-200"
          aria-label="Start shopping"
        >
          <FiShoppingCart className="h-12 w-auto" />
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
