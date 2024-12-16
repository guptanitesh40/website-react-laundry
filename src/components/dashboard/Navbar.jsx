import { FaHome } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthStatus } from "../../redux/slices/authSlice";

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = (e) => {
    e.preventDefault();
    localStorage.clear();
    dispatch(setAuthStatus(false));
    navigate("/login");
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
    profile_image = "./default_avatar.png";
  }
  return (
    <div className="flex">
      <Link to="/">
        <img src="/dash-logo.png" alt="Logo" className="dash-logo" />
      </Link>
      <div className="bg-[var(--primary)] grow flex justify-between items-center px-8">
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
            {cartItem && (
              <div className="cart-item">
                <span>{cartItem}</span>
              </div>
            )}
          </Link>
          <span className="inline-block h-[4.6rem] w-[4.6rem] group relative">
            <img
              src={profile_image}
              alt="Avatar"
              className="h-full w-full rounded-full border border-white/20"
            />
            <div className="dashboard-menu-container group-hover:block">
              <div className="dashboard-avatar-menu ">
                <div className="dash-menu-container z-10">
                  <Link to="/">
                    <FaHome className="h-[2.4rem] w-[2.4rem] fill-[#676788]" />
                    <span>home</span>
                  </Link>
                  <Link to="" onClick={onLogoutClick}>
                    <FiLogOut className="h-[2.4rem] w-[2.4rem] stroke-[#676788]" />
                    <span>logout</span>
                  </Link>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
