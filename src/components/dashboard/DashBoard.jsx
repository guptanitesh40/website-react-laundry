import "./dashboard.css";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashBoard = () => {
  return (
    <div className="dashboard-container">
      <Link to="/">
        <img src="/dash-logo.png" alt="Logo" className="dash-logo" />
        <img src="/512x51201.png" alt="Logo" className="mobile-dash-logo"></img>
      </Link>
      <Navbar />
      <div className="flex flex-col justify-between border-r border-[#b9bccf4d] tab:border-t">
        <div className="py-16 laptop-m:py-12 laptop-s:py-10 tab-l:py-8 tab:py-6 mb:py-5">
          <Sidebar />
        </div>
        <div className="bg-[#F7F8FD] text-center border-t border-[#B9BCCF4D] py-[2.3rem] laptop-m:py-8 tab-l:py-6 tab:hidden">
          <span className="text-[1.4rem] leading-[1] text-[#676788] font-medium laptop-m:text-xl tab-l:text-lg">
            © 2014 Sikka Cleaners
          </span>
        </div>
      </div>
      <div className="py-14 px-12 bg-[rgba(239,243,255,0.8)] relative laptop-m:py-12 laptop-m:px-10 laptop-s:py-10 laptop-s:px-8 tab-l:px-6 tab-l:py-8 tab:p-6 mb:p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
