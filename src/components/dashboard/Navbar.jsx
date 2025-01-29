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
    "/dashboard/profile": "Profile",
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
      <div className="z-50 bg-[var(--primary)] flex justify-between items-center px-8 laptop-m:px-6 laptop-s:px-5 tab-l:px-4 tab:py-3 mb-l:py-2 mb:p-2">
        <p className="text-[2rem] leading-[2.4rem] font-semibold text-white tracking-wide laptop-m:text-[1.8rem] laptop-m:leading-normal laptop-s:text-[1.6rem] laptop-s:font-medium tab-l:text-[1.4rem] mb:text-[1.2rem]">
          {routeMap[pathname]}
        </p>
        <div className="flex items-center justify-center gap-6 laptop-s:gap-5 tab-l:gap-4">
          <Link
            to="/cart"
            className="relative flex justify-center items-center h-[4.6rem] w-[4.6rem] border border-white/30 rounded-full laptop-m:h-[4.2rem] laptop-m:w-[4.2rem] laptop:h-16 laptop:w-16 tab-l:h-[3.75rem] tab-l:w-[3.75rem] tab-m:h-14 tab-m:w-14 mb:h-12 mb:w-12"
          >
            <LuShoppingCart
              className="inline-block h-10 w-10 stroke-white laptop-m:h-8 laptop-m:w-8 tab-l:h-7 tab-l:w-7 tab-m:h-6 tab-m:w-6 mb:h-[1.3rem] mb:w-[1.3rem]"
              aria-label="Shopping Cart"
            />
            {cartItem > 0 && (
              <div className="cart-item">
                <span>{cartItem}</span>
              </div>
            )}
          </Link>
          <span
            className="inline-block h-[4.6rem] w-[4.6rem] group relative cursor-pointer laptop-m:h-[4.2rem] laptop-m:w-[4.2rem] laptop:h-16 laptop:w-16 tab-l:h-[3.75rem] tab-l:w-[3.75rem] tab-m:h-14 tab-m:w-14 mb:h-12 mb:w-12"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              src={profile_image}
              alt="Avatar"
              className="h-full w-full rounded-full border border-white/20"
            />
            {isOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg border border-[#B9BCCF4D] z-10 tab-l:w-40 mb-l:w-32">
                <div className="absolute top-[-6px] right-7 w-4 h-4 bg-white rotate-45 border-t border-l border-[#B9BCCF4D] -z-10 laptop-m:right-6 tab-l:right-5"></div>
                <ul className="flex flex-col py-2 tab-l:py-1">
                  <li
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer mb-l:gap-2 mb-l:px-2 mb-l:py-1"
                    onClick={onHomeClick}
                  >
                    <FaHome className="w-8 h-8 text-[#676788] laptop-m:h-7 laptop-m:w-7 mb-l:h-6 mb-l:w-6" />
                    <span className="text-2xl text-[var(--black)] font-medium laptop-m:text-[1.4rem] tab-l:text-[1.3rem] mb-l:text-[1.1rem]">
                      Home
                    </span>
                  </li>
                  <li
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer mb-l:gap-2 mb-l:px-2 mb-l:py-1"
                    onClick={onLogoutClick}
                  >
                    <LuLogOut className="w-8 h-8 text-[#676788] laptop-m:h-7 laptop-m:w-7 mb-l:h-6 mb-l:w-6" />
                    <span className="text-2xl text-[var(--black)] font-medium laptop-m:text-[1.4rem] tab-l:text-[1.3rem] mb-l:text-[1.1rem]">
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
