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
import { IoIosContact, IoIosPricetags } from "react-icons/io";
import {
  MdLocalLaundryService,
  MdOutlineLocalLaundryService,
  MdPermContactCalendar,
} from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { LogoutOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";

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
    dispatch(setAuthStatus(false));
    navigate("/");
    toast.success("User logged out successfully.", {
      className: "toast-success",
    });
  };

  const onProfileClick = () => {
    navigate("/dashboard/home");
  };

  const handleMobileLogout = () => {
    toggleOpen();
    onLogoutClick();
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
          pathname === "/order-now" ? "path-service" : "bg-gray-200"
        }`}
      >
        <div className="container-b">
          <div className="flex items-center justify-between">
            <Link to="/" title="sikke cleaners" aria-label="sikke cleaners">
              <div className="mobile:hidden">
                {pathname === "/order-now" ? (
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
              </div>
              <div className="hidden mobile:block">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 685 451"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M85.8398 156.275L151.837 40.2085L158.184 43.9451L92.187 160.011L85.8398 156.275ZM108.654 170.161L174.651 54.095L180.998 57.8316L115.001 173.898L108.654 170.161ZM131.467 184.048L197.464 67.9815L203.812 71.7181L137.815 187.784L131.467 184.048ZM154.281 197.934L220.278 81.868L226.625 85.6046L160.628 201.671L154.281 197.934ZM411.75 322.086L477.543 163.531L484.299 166.434L418.506 324.988L411.75 322.086ZM425.602 342.81L494.451 177.208L501.205 180.115L432.356 345.717L425.602 342.81ZM439.656 363.746L515.634 180.528L522.39 183.428L446.412 366.647L439.656 363.746ZM453.711 384.471L529.689 201.46L536.444 204.363L460.467 387.375L453.711 384.471Z"
                    fill={pathname === "/order-now" ? "#FFFFFF" : "#161F5F"}
                  />
                  <path
                    d="M51.942 412.657C80.6629 438.15 122.42 451 176.196 451C213.879 451 244.229 445.404 269.284 435.041C294.542 424.263 313.485 408.304 327.337 386.542C340.984 364.572 347.502 341.566 347.502 316.695C347.502 288.715 342.206 265.501 330.799 247.262C319.596 228.402 303.301 213.893 283.746 202.909C263.377 191.924 232.415 181.768 190.454 171.405C148.697 161.664 122.42 151.922 111.013 142.181C102.662 134.927 98.588 126.429 98.588 116.066C98.588 104.46 103.273 95.3401 112.236 88.7077C126.087 78.3447 145.641 72.9559 170.899 72.9559C194.732 72.9559 212.657 77.7229 225.082 87.4642C237.1 97.2054 244.84 113.579 248.507 136.171L335.077 133.062C333.855 92.8529 319.596 60.1057 292.709 36.4779C265.21 12.0211 225.082 0 171.307 0C139.123 0 111.013 4.767 87.7922 15.1301C64.5711 25.4931 47.2571 40.0014 34.628 59.4839C21.999 78.9665 16.0918 99.6926 16.0918 121.455C16.0918 156.068 29.3319 185.291 55.6085 209.541C73.941 226.744 106.328 241.252 152.363 252.858C188.213 261.978 211.435 267.989 221.008 271.719C235.878 277.108 246.063 283.119 251.97 290.373C258.081 297.834 260.932 306.954 260.932 316.695C260.932 333.068 253.803 346.955 240.155 358.562C225.761 370.721 204.849 376.801 177.418 376.801C151.073 376.801 130.161 370.099 114.68 356.696C99.8101 343.432 89.0144 322.084 84.1257 293.482L0 301.979C5.29605 350.686 22.6101 387.785 51.942 412.657ZM577.677 145.912C556.085 129.331 526.346 120.833 489.681 120.833C444.732 120.833 409.154 135.411 382.945 164.565C356.669 193.167 343.428 233.998 343.428 286.228C343.428 337.836 356.669 378.044 382.945 407.061C409.222 436.285 444.257 451 488.459 451C527.568 451 558.326 441.259 581.14 422.398C604.497 402.915 620.249 374.313 628.397 336.592L549.771 322.705C545.697 344.468 538.568 360.427 529.198 369.546C519.42 378.666 507.199 382.811 491.921 382.811C471.552 382.811 455.868 374.935 443.646 359.805C431.424 343.846 425.517 317.731 425.517 280.217C425.517 246.641 431.424 222.391 443.646 207.883C455.257 193.789 470.941 186.535 490.903 186.535C505.976 186.535 518.198 190.887 527.568 198.763C536.938 207.261 542.641 219.282 545.697 235.863L624.323 221.148C614.953 187.157 599.268 162.285 577.677 145.912Z"
                    fill={pathname === "/order-now" ? "#FFFFFF" : "#161F5F"}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M645.711 64.2532C626.564 64.2532 610.879 80.1994 610.879 99.902C610.879 119.391 626.557 135.344 645.711 135.344C665.074 135.344 680.746 119.384 680.746 99.902C680.746 80.2062 665.068 64.2532 645.711 64.2532ZM607.212 99.902C607.212 78.1525 624.526 60.5225 645.711 60.5225C667.093 60.5225 684.413 78.1457 684.413 99.902C684.413 121.458 667.086 139.074 645.711 139.074C624.532 139.074 607.212 121.451 607.212 99.902Z"
                    fill={pathname === "/order-now" ? "#FFFFFF" : "#2C2E35"}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M628.804 119.177V80.4194H644.896C648.969 80.4194 651.957 80.7649 653.858 81.4557C655.623 82.1466 657.049 83.3902 658.136 85.1864C659.358 86.9827 659.969 89.0553 659.969 91.4043C659.833 94.3059 658.95 96.6549 657.321 98.4512C655.691 100.386 653.179 101.629 649.784 102.182C651.414 103.149 652.84 104.185 654.062 105.291C655.012 106.534 656.438 108.676 658.339 111.716L663.024 119.177H653.858L648.358 110.68C646.321 107.64 644.964 105.774 644.285 105.084C643.47 104.254 642.655 103.702 641.84 103.425C641.025 103.149 639.735 103.011 637.97 103.011H636.34V119.177H628.804ZM636.544 96.7931H642.248C645.914 96.7931 648.223 96.6549 649.173 96.3785C650.124 96.1022 650.871 95.5495 651.414 94.7205C651.821 94.0296 652.025 93.0624 652.025 91.8188C652.161 90.5752 651.889 89.5389 651.21 88.7099C650.531 87.8808 649.513 87.3281 648.155 87.0518C647.544 87.0518 645.71 87.0518 642.655 87.0518H636.544V96.7931Z"
                    fill={pathname === "/order-now" ? "#FFFFFF" : "#2C2E35"}
                  />
                </svg>
              </div>
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
                    to="/order-now"
                    title="Order Now"
                    aria-label="Order Now"
                    className={`${
                      pathname === "/order-now" ? "active-nav" : ""
                    }`}
                  >
                    Order Now
                  </Link>
                </li>
                <li>
                  <Link
                    to="/our-services"
                    title="Our Services"
                    aria-label="Our Services"
                    className={`${
                      pathname === "/our-services" ? "active-nav" : ""
                    }`}
                  >
                    Our Services
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

            <div className="flex justify-center items-center gap-8 laptop-l:gap-6 tab:gap-4 mb:ml-2 mb-s:gap-2">
              {pathname !== "/quick-order" && (
                <div>
                  <Link
                    to="/quick-order"
                    title="Pickup Clothes"
                    aria-label="Pickup Clothes"
                    className="bg-white text-gray-800 border border-gray-300 px-[1.5rem] py-[0.5rem] rounded-xl shadow-sm hover:bg-gray-100 transition tab:px-[1rem] tab-z:px-[.8rem] tab-z:text-[1.5rem] mb-x:px-[.7rem] mb-x:text-[1.2rem] mb-m:text-[1.2rem] mb-m:px-[.5rem]"
                  >
                    Quick Order
                  </Link>
                </div>
              )}
              {isLoggedIn && (
                <Link
                  to="/cart"
                  className={`
                    ${
                      pathname === "/order-now"
                        ? "bg-transparent border-white/25"
                        : "bg-white border-black/25 "
                    }
                  relative inline-block border-[1.5px] h-[4.6rem] w-[4.6rem] rounded-full p-4 laptop-l:h-[4.2rem] laptop-l:w-[4.2rem] laptop:h-[4rem] laptop:w-[4rem] tab-l:h-[3.8rem] tab-l:w-[3.8rem] tab-m:h-[3.6rem] tab-m:w-[3.6rem] tab-m:border mb-xs:h-[3.4rem] mb-xs:w-[3.4rem]`}
                >
                  <LuShoppingCart
                    className={`h-full w-full ${
                      pathname === "/order-now"
                        ? "stroke-[var(--white)]"
                        : "stroke-[var(--black)]"
                    }`}
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
              )}

              {isLoggedIn ? (
                <button
                  onClick={onProfileClick}
                  role="button"
                  title="My Account"
                  aria-label="My Account"
                  className="bg-primary text-white px-[1.5rem] py-[0.75rem] rounded-[30px] hover:bg-primary-dark transition-all duration-200 tab:py-[.5rem] tab-z:px-[1rem] mb-x:px-[.8rem] mb-x:text-[1.4rem] mb-m:px-[.8rem] mb-m:-mr-2 mb-xs:px-[.7rem] mb-xs:py-[.4rem]"
                >
                  My Account
                </button>
              ) : (
                <Link
                  to="/login"
                  state={{ from: pathname }}
                  role="button"
                  title="login"
                  aria-label="login"
                  className="bg-primary text-white px-[1.5rem] py-[0.75rem] rounded-[30px] hover:bg-primary-dark transition-all duration-200 tab:py-[.5rem] tab-z:px-[1rem] mb-x:px-[.8rem] mb-x:text-[1.4rem] mb-m:px-[.8rem] mb-m:-mr-2 mb-xs:px-[.7rem] mb-xs:py-[.4rem]"
                >
                  My Account
                </Link>
              )}

              <div className="h-[3.8rem] w-[3.8rem] justify-end items-center hidden tab-m:flex tab:h-[3.2rem] tab:w-[3.2rem] mb-m:-mr-3">
                <div
                  className={`hamburger ${
                    pathname === "/order-now" ? "white-hamburger" : ""
                  } ${isOpen ? "active-mobile-nav" : ""}`}
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
          <nav className="flex flex-col gap-2 p-2 font-sans">
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
              to="/order-now"
              className={`nav-item ${
                pathname === "/order-now" ? "active-nav-item" : ""
              }`}
              onClick={toggleOpen}
            >
              <div>
                <MdLocalLaundryService className="nav-icon" />
              </div>
              Order Now
            </Link>

            <Link
              to="/our-services"
              className={`nav-item ${
                pathname === "/our-services" ? "active-nav-item" : ""
              }`}
              onClick={toggleOpen}
            >
              <div>
                <MdOutlineLocalLaundryService className="nav-icon" />
              </div>
              Our Services
            </Link>

            <Link
              to="/prices"
              className={`nav-item ${
                pathname === "/prices" ? "active-nav-item" : ""
              }`}
              onClick={toggleOpen}
            >
              <div>
                <IoIosPricetags className="nav-icon" />
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
                <HiUserGroup className="nav-icon" />
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
                <MdPermContactCalendar className="nav-icon" />
              </div>
              Contact us
            </Link>

            {isLoggedIn && (
              <>
                <Link
                  to="/dashboard/home"
                  className={`nav-item ${
                    pathname === "/dashboard/home" ? "active-nav-item" : ""
                  }`}
                  onClick={toggleOpen}
                >
                  <div>
                    <IoIosContact className="nav-icon" />
                  </div>
                  Profile
                </Link>

                <button className="nav-item" onClick={handleMobileLogout}>
                  <div>
                    <LogoutOutlined className="nav-icon" />
                  </div>
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
