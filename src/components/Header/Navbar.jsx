import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setAuthStatus } from "../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cartItem = useSelector((state) => state.cart.cartItemCount);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  let profile_image = useSelector((state) => state.user.user.image);
  const [isOpen, setIsOpen] = useState(false);
  if (!profile_image) {
    profile_image = "/default_pfp.png";
  }

  const onLogoutClick = () => {
    localStorage.clear();
    navigate("/login");
    dispatch(setAuthStatus(false));
  };

  const onProfileClick = () => {
    navigate("/dashboard/home");
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <nav
        className={`py-4 laptop-l:py-3 tab-m:py-2 ${
          pathname === "/services" ? "path-service" : "bg-gray-200"
        }`}
      >
        <div className="container-b">
          <div className="flex items-center justify-between">
            <Link to="/" title="sikke cleaners" aria-label="sikke cleaners">
              {pathname === "/services" ? (
                <img
                  src="/menu.png"
                  alt="logo"
                  className="h-16 w-96 laptop-l:h-14 laptop-l:w-80 laptop-m:h-12 laptop-m:w-72 laptop:h-10 laptop:w-64 laptop-s:w-56 laptop-s:h-auto"
                />
              ) : (
                <img
                  src="/logo.png"
                  alt="logo"
                  className="h-16 w-96 laptop-l:h-14 laptop-l:w-80 laptop-m:h-12 laptop-m:w-72 laptop:h-10 laptop:w-64 laptop-s:w-56 laptop-s:h-auto"
                />
              )}
            </Link>

            <div className="tab-m:hidden">
              <ul className="navbar">
                <li>
                  <Link
                    to="/"
                    title="Home"
                    aria-label="Home"
                    className={`${pathname === "/" ? "active-nav" : ""}`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    title="Our Service"
                    aria-label="Our Service"
                    className={`${
                      pathname === "/services" ? "active-nav" : ""
                    }`}
                  >
                    Our Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/corporate-services"
                    title="Corporate Services"
                    aria-label="Corporate Services"
                    className={`${
                      pathname === "/corporate-services" ? "active-nav" : ""
                    }`}
                  >
                    Corporate Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/prices"
                    title="Price List"
                    aria-label="Price List"
                    className={`${pathname === "/prices" ? "active-nav" : ""}`}
                  >
                    Price List
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    title="About Us"
                    aria-label="About Us"
                    className={`${pathname === "/about" ? "active-nav" : ""}`}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    title="Contact Us"
                    aria-label="Contact Us"
                    className={`${pathname === "/contact" ? "active-nav" : ""}`}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex justify-center items-center gap-8 laptop-l:gap-6 tab:gap-4">
              <Link
                to="/cart"
                className="relative inline-block bg-white border-[1.5px] border-black/25 h-[4.6rem] w-[4.6rem] rounded-full p-4 laptop-l:h-[4.2rem] laptop-l:w-[4.2rem] laptop:h-[4rem] laptop:w-[4rem] tab-l:h-[3.8rem] tab-l:w-[3.8rem] tab-m:h-[3.6rem] tab-m:w-[3.6rem] tab-m:border"
              >
                <LuShoppingCart
                  className="h-full w-full stroke-[var(--black)]"
                  aria-label="Shopping Cart"
                  title="cart"
                />
                {cartItem ? (
                  <div className="cart-tag">
                    <span>{cartItem}</span>
                  </div>
                ) : (
                  ""
                )}
              </Link>
              {isLoggedIn ? (
                <span className="inline-block h-[4.6rem] w-[4.6rem] relative group laptop-l:h-[4.2rem] laptop-l:w-[4.2rem] laptop:h-[4rem] laptop:w-[4rem] tab-l:h-[3.8rem] tab-l:w-[3.8rem] tab-m:hidden">
                  <img
                    src={profile_image}
                    alt="Avatar"
                    className="h-full w-full rounded-full border-[1.5px] border-black/45 laptop-l:border"
                    loading="lazy"
                  />
                  <div className="hidden group-hover:inline-block z-10">
                    <div className="logout-container flex flex-col items-start gap-4">
                      <span
                        className="flex items-center justify-center gap-4 cursor-pointer"
                        onClick={onProfileClick}
                      >
                        <CgProfile className="h-[2rem] w-[2rem] text-[#676788]" />
                        <span className="logout">Profile</span>
                      </span>
                      <span
                        className="flex items-center justify-center gap-4 cursor-pointer"
                        onClick={onLogoutClick}
                      >
                        <FiLogOut className="h-[2rem] w-[2rem] stroke-[#676788]" />
                        <span className="logout">logout</span>
                      </span>
                    </div>
                  </div>
                </span>
              ) : (
                <Link
                  to="/login"
                  className="login"
                  role="button"
                  title="login"
                  aria-label="login"
                >
                  Login
                </Link>
              )}
              <div className="h-[3.8rem] w-[3.8rem] justify-center items-center hidden tab-m:flex tab:h-[3.2rem] tab:w-[3.2rem]">
                <div
                  className={`hamburger ${isOpen ? "active-mobile-nav" : ""}`}
                  onClick={toggleOpen}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`mobile-nav-cover ${isOpen ? "animate-nav-cover" : ""}`}
        onClick={toggleOpen}
      ></div>
      <div
        className={`mobile-nav-container space-y-8 shadow-2xl ${
          isOpen ? "animate-nav-container overflow-hidden" : ""
        }`}
      >
        <div
          className={`relative flex flex-col rounded-xl bg-transparent p-4 text-[var(--primary)]`}
        >
          <div className="p-4 flex items-center justify-between">
            <h5 className="block font-sans text-[1.8rem] antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Sidebar
            </h5>
            <RxCross2 className="h-9 w-9 cursor-pointer" onClick={toggleOpen} />
          </div>
          <nav className="flex flex-col gap-2 p-2 font-sans text-[1.4rem] font-medium text-[var(--primary)]">
            <Link
              to="/"
              className={`nav-item ${
                pathname === "/" ? "active-nav-item" : ""
              }`}
              onClick={toggleOpen}
            >
              <div>
                <FaHome className="nav-icon" />
              </div>
              Home
            </Link>

            <Link
              to="/services"
              className={`nav-item ${
                pathname === "/services" ? "active-nav-item" : ""
              }`}
              onClick={toggleOpen}
            >
              <div>
                <IoMdSettings className="nav-icon" />
              </div>
              Our Services
            </Link>

            <Link
              to="/corporate-services"
              className={`nav-item ${
                pathname === "/corporate-services" ? "active-nav-item" : ""
              }`}
              onClick={toggleOpen}
            >
              <div>
                <IoMdSettings className="nav-icon" />
              </div>
              Corporate Services
            </Link>

            <Link
              to="/prices"
              className={`nav-item ${
                pathname === "/prices" ? "active-nav-item" : ""
              }`}
              onClick={toggleOpen}
            >
              <div>
                <IoMdSettings className="nav-icon" />
              </div>
              Price List
            </Link>

            <Link
              to="/about"
              className={`nav-item ${
                pathname === "/about" ? "active-nav-item" : ""
              }`}
              onClick={toggleOpen}
            >
              <div>
                <IoMdSettings className="nav-icon" />
              </div>
              About us
            </Link>

            <Link
              to="/contact"
              className={`nav-item ${
                pathname === "/contact" ? "active-nav-item" : ""
              }`}
              onClick={toggleOpen}
            >
              <div>
                <IoMdSettings className="nav-icon" />
              </div>
              Contact us
            </Link>

            <Link
              to="/dashboard/home"
              className={`nav-item ${
                pathname === "/dashboard/home" ? "active-nav-item" : ""
              }`}
              onClick={toggleOpen}
            >
              <div>
                <IoMdSettings className="nav-icon" />
              </div>
              Profile
            </Link>

            <Link to="" className="nav-item" onClick={toggleOpen}>
              <div>
                <IoMdSettings className="nav-icon" />
              </div>
              Logout
            </Link>

            <Link to="/" className="nav-item" onClick={toggleOpen}>
              <div>
                <IoMdSettings className="nav-icon" />
              </div>
              Setting
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
