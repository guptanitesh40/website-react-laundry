import "./dashboard.css";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashBoard = () => {
  return (
    <div className="dashboard-container flex flex-col">
      <div className="flex">
        <Link
          to="/"
          className="inline-block w-[28rem] h-auto laptop-m:w-[25rem] laptop-s:w-[22.5rem] tab-l:w-[20rem] tab-s:w-[17.5rem] tab:h-20 tab:w-20 mb-l:h-[4.5rem] mb-l:w-[4.5rem] mb:h-16 mb:w-16"
        >
          <img src="/dash-logo.png" alt="Logo" className="dash-logo" />
          <img
            src="/512x51201.png"
            alt="Logo"
            className="mobile-dash-logo"
          ></img>
        </Link>
        <Navbar />
      </div>

      <div className="grow flex">
        <div className="w-[28rem] flex flex-col justify-between border-r border-[#b9bccf4d] tab:border-t laptop-m:w-[25rem] laptop-s:w-[22.5rem] tab-l:w-[20rem] tab-s:w-[17.5rem] tab:w-20 mb-l:w-[4.5rem] mb:w-16">
          <div className="py-16 laptop-m:py-12 laptop-s:py-10 tab-l:py-8 tab:py-6 mb:py-5">
            <Sidebar />
          </div>
          <div className="bg-[#F7F8FD] text-center border-t border-[#B9BCCF4D] py-[2.3rem] laptop-m:py-8 tab-l:py-6 tab:hidden">
            <span className="text-[1.4rem] leading-[1] text-[#676788] font-medium laptop-m:text-xl tab-l:text-lg">
              © 2014 Sikka Cleaners
            </span>
          </div>
        </div>
        <div className="w-[calc(100%-28rem)] py-14 px-12 bg-[rgba(239,243,255,0.8)] relative laptop-m:py-12 laptop-m:px-10 laptop-s:py-10 laptop-s:px-8 tab-l:px-6 tab-l:py-8 tab:p-6 mb:p-4 laptop-m:w-[calc(100%-25rem)] laptop-s:w-[calc(100%-22.5rem)] tab-l:w-[calc(100%-20rem)] tab-s:w-[calc(100%-17.5rem)] tab:w-[calc(100%-5rem)] mb-l:p-4 mb-l:w-calc(100%-4.5rem) mb:w-calc(100%-4rem)">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
