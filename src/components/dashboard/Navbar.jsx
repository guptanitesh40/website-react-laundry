import { FaHome } from "react-icons/fa";
import { LuLogOut, LuShoppingCart } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "../../redux/slices/authSlice";
import { useState } from "react";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const onLogoutClick = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(setAuthStatus(false));
    navigate("/login");
  };

  const onHomeClick = () => {
    navigate("/");
  };

  const routeMap = {
    "/dashboard/home": "Dashboard",
    "/dashboard/profile": "Pofile",
    "/dashboard/price-list": "Price List View",
    "/dashboard/write-review": "Write a Review",
    "/dashboard/saved-addresses": "Saved Addresses",
    "/dashboard/view-order": "View Order",
  };
  let cartItem = parseInt(useSelector((state) => state.cart.cartItemCount));
  let profile_image = useSelector((state) => state.user.user.image);
  if (!profile_image) {
    profile_image = "/default_pfp.png";
  }

  return (
    <>
      <div className="bg-[var(--primary)] flex justify-between items-center px-8">
        <p className="text-[2rem] leading-[2.4rem] font-semibold text-white tracking-wide">
          {routeMap[pathname]}
        </p>
        <div className="flex items-center justify-center gap-6">
          <Link
            to="/cart"
            className="relative inline-block h-[4.6rem] w-[4.6rem] border border-white/30 rounded-full"
          >
            <LuShoppingCart
              className="inline-block h-full w-full stroke-white p-4"
              aria-label="Shopping Cart"
            />
            {cartItem > 0 && (
              <div className="cart-item">
                <span>{cartItem}</span>
              </div>
            )}
          </Link>
          <span
            className="inline-block h-[4.6rem] w-[4.6rem] group relative cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={profile_image}
              alt="Avatar"
              className="h-full w-full rounded-full border border-white/20"
            />
            {isOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg border border-[#B9BCCF4D] z-10">
                <div className="absolute top-[-6px] right-7 w-4 h-4 bg-white rotate-45 border-t border-l border-[#B9BCCF4D] -z-10"></div>
                <ul className="flex flex-col py-2">
                  <li
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={onHomeClick}
                  >
                    <FaHome className="w-8 h-8 text-[#676788]" />
                    <span className="text-2xl text-[var(--black)] font-medium">
                      Home
                    </span>
                  </li>
                  <li
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={onLogoutClick}
                  >
                    <LuLogOut className="w-8 h-8 text-[#676788]" />
                    <span className="text-2xl text-[var(--black)] font-medium">
                      Logout
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
