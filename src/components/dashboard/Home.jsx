import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { RiHourglassFill, RiMoneyRupeeCircleFill } from "react-icons/ri";
import { IoCaretDown, IoCaretUp, IoNewspaper } from "react-icons/io5";
import useGetOrders from "../../hooks/dashboard/useGetOrders";
import Loading from "./Loading";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaStar,
} from "react-icons/fa";
import useGetOrders02 from "../../hooks/dashboard/useGetOrders02";
import { IoMdDownload } from "react-icons/io";
import useDownloadInvoice from "../../hooks/invoice/useDownloadInvoice";
import { CiStar } from "react-icons/ci";

import { IconButton } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import FeedbackModel from "./FeedbackModel";

const Home = () => {
  const { getOrders } = useGetOrders();
  const { getOrders02 } = useGetOrders02();
  const [orders, setOrders] = useState([]);
  const [ipoCount, setIpoCount] = useState(0);
  const [totalDueAmt, SetTotalDueAmt] = useState(0);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [activeBtn, setActiveBtn] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [invoice, setInvoice] = useState(0);
  const [modelProp, setModelProp] = useState("");
  const [currentFb, setCurrentFb] = useState({});
  const { downloadInvoice, loading: loadingInvoice } = useDownloadInvoice();
  const navigate = useNavigate();

  const [modelIsOpen, setModelIsOpen] = useState(false);

  const handlePageClick = async (page) => {
    setLoading(true);
    setCurrentPage(page);
    const result = await getOrders02(page);
    if (result) {
      setOrders(result.result);
      setLoading(false);
    }
  };

  const handleUpDownClick = async (order_by) => {
    if (sortOrder == "desc") {
      setSortOrder("asc");
      const result = await getOrders02(currentPage, sortOrder, order_by);
      if (result) {
        setOrders(result.result);
      }
    } else {
      setSortOrder("desc");
      const result = await getOrders02(currentPage, sortOrder, order_by);
      if (result) {
        setOrders(result.result);
      }
    }
  };

  const handleDownloadClick = async (order_id) => {
    setInvoice(order_id);
    await downloadInvoice(order_id);
  };

  const handleGiveFeedBack = (order_id, feedback) => {
    setModelIsOpen(true);
    setModelProp(order_id);
    setCurrentFb(feedback);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await getOrders();
      if (result) {
        SetTotalDueAmt(result?.totalPendingAmount?.total_pending_due_amount);
        setIpoCount(result.inProgressCount);
        setTotalRows(result.count);
        setCount(Math.ceil(result.count / 10));
        setOrders(result.result);
        setLoading(false);
      }
    };
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col gap-8 laptop-s:gap-6">
        <div className="flex gap-14 laptop:gap-10 laptop-s:gap-8 tab-l:gap-6">
          <div className="status-card flex gap-8 items-center laptop-s:gap-6 tab-l:gap-4">
            <span className="bg-[#FFE0EB] inline-block h-24 w-24 rounded-full laptop:h-20 laptop:w-20 tab-l:h-16 tab-l:w-16">
              <RiMoneyRupeeCircleFill className="inline-block p-5 h-full w-full fill-[#FF82AC] laptop:p-4 tab-l:p-3" />
            </span>
            <div className="flex flex-col gap-4 tab-l:gap-3">
              <p className="card-label">Total Pending Due Amount</p>
              <p className="card-price">₹{totalDueAmt || "0"}</p>
            </div>
          </div>

          <div className="status-card flex gap-8 items-center laptop-s:gap-6 tab-l:gap-4">
            <span className="bg-[#DCFAF8] inline-block h-24 w-24 rounded-full laptop:h-20 laptop:w-20 tab-l:h-16 tab-l:w-16">
              <IoNewspaper className="inline-block p-7 h-full w-full fill-[#16DBCC] laptop:p-5 tab-l:p-4" />
            </span>
            <div className="flex flex-col gap-4 tab-l:gap-3">
              <p className="card-label">Lifetime Total Order Number</p>
              <p className="card-price">{totalRows}</p>
            </div>
          </div>

          <div className="status-card flex gap-8 items-center laptop-s:gap-6 tab-l:gap-4">
            <span className="bg-[#FEF7E7] inline-block h-24 w-24 rounded-full laptop:h-20 laptop:w-20 tab-l:h-16 tab-l:w-16">
              <RiHourglassFill className="inline-block p-6 h-full w-full fill-[#F2B413] laptop:p-5 tab-l:p-4" />
            </span>
            <div className="flex flex-col gap-4 tab-l:gap-3">
              <p className="card-label">Total In Progress Orders</p>
              <p className="card-price">{ipoCount}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 laptop:gap-6">
          <h3 className="booking-title">Your Booking List</h3>
          <div className="main-orders-container">
            <div className="orders-table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th
                      className="flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => handleUpDownClick("order_id")}
                    >
                      <span>order id</span>
                      <span className="flex flex-col">
                        <IoCaretUp className="updown-icon" />
                        <IoCaretDown className="updown-icon" />
                      </span>
                    </th>
                    <th
                      className="flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => handleUpDownClick("created_at")}
                    >
                      <span>booking date</span>
                      <span className="flex flex-col">
                        <IoCaretUp className="updown-icon" />
                        <IoCaretDown className="updown-icon" />
                      </span>
                    </th>
                    <th
                      className="flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() =>
                        handleUpDownClick("estimated_delivery_time")
                      }
                    >
                      <span>delivery date</span>
                      <span className="flex flex-col">
                        <IoCaretUp className="updown-icon" />
                        <IoCaretDown className="updown-icon" />
                      </span>
                    </th>
                    <th
                      className="flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => handleUpDownClick("total")}
                    >
                      <span>amount</span>
                      <span className="flex flex-col">
                        <IoCaretUp className="updown-icon" />
                        <IoCaretDown className="updown-icon" />
                      </span>
                    </th>
                    <th
                      className="flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => handleUpDownClick("kasar_amount")}
                    >
                      <span>kasar</span>
                      <span className="flex flex-col">
                        <IoCaretUp className="updown-icon" />
                        <IoCaretDown className="updown-icon" />
                      </span>
                    </th>
                    <th
                      className="flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => handleUpDownClick("paid_amount")}
                    >
                      <span>paid amt</span>
                      <span className="flex flex-col">
                        <IoCaretUp className="updown-icon" />
                        <IoCaretDown className="updown-icon" />
                      </span>
                    </th>
                    <th
                      className="flex items-center justify-center gap-2 cursor-pointer"
                      onClick={() => handleUpDownClick("order_status")}
                    >
                      <span>status</span>
                      <span className="flex flex-col">
                        <IoCaretUp className="updown-icon" />
                        <IoCaretDown className="updown-icon" />
                      </span>
                    </th>
                    <th className="col-span-3">actions</th>
                  </tr>
                </thead>
                <tbody>
                  {totalRows > 0 ? (
                    orders.map((order, index) => {
                      const {
                        order_id,
                        total,
                        created_at,
                        estimated_delivery_time,
                        kasar_amount,
                        paid_amount,
                        order_status,
                        order_status_name,
                        feedback,
                      } = order;

                      return (
                        <tr key={index}>
                          <td>{order_id}</td>
                          <td>
                            {dayjs(created_at).format("DD/MM/YYYY, hh:mm A")}
                          </td>
                          <td>
                            {dayjs(estimated_delivery_time).format(
                              "DD/MM/YYYY"
                            )}
                          </td>
                          <td>₹{total}</td>
                          <td>₹{kasar_amount}</td>
                          <td>{"₹" + paid_amount || "0"}</td>
                          <td
                            style={{ padding: "5px", textAlign: "left" }}
                            className="flex items-center justify-center"
                          >
                            <span
                              className={`inline-block px-4 py-1 rounded-lg font-medium text-[1rem] leading-[2.4rem] order-status-label-${
                                order_status >= 4 && order_status < 9
                                  ? 0
                                  : order_status
                              }`}
                            >
                              {order_status_name}
                            </span>
                          </td>
                          <td
                            style={{ padding: "5px" }}
                            className="flex items-center justify-center"
                          >
                            <div className="relative group">
                              <IconButton
                                onClick={() =>
                                  navigate("/dashboard/view-order", {
                                    state: { order_id },
                                  })
                                }
                              >
                                <RemoveRedEyeOutlinedIcon
                                  sx={{
                                    height: "22.5px",
                                    width: "22.5px",
                                    color: "var(--primary)",
                                  }}
                                />
                              </IconButton>

                              <div
                                role="tooltip"
                                className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--primary)] text-white rounded-md shadow-sm px-3 py-2 text-sm text-nowrap"
                                style={{
                                  top: "-25px",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                }}
                              >
                                View
                                <div
                                  className="tooltip-arrow"
                                  data-popper-arrow
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td
                            style={{ padding: "5px" }}
                            className="flex items-center justify-center"
                          >
                            {loadingInvoice && invoice === order_id ? (
                              <IconButton>
                                <span className="inline-block h-8 w-8 rounded-full border-[3px] border-indigo-100 border-t-indigo-600 border-r-indigo-600 animate-spin"></span>
                              </IconButton>
                            ) : (
                              <>
                                <div className="relative group">
                                  <IconButton
                                    disabled={loadingInvoice}
                                    onClick={() =>
                                      handleDownloadClick(order_id)
                                    }
                                  >
                                    <IoMdDownload className="inline-block h-9 w-9 cursor-pointer fill-[var(--primary)]" />
                                  </IconButton>

                                  <div
                                    role="tooltip"
                                    className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--primary)] text-white rounded-md shadow-sm px-3 py-2 text-sm text-nowrap"
                                    style={{
                                      top: "-25px",
                                      left: "50%",
                                      transform: "translateX(-50%)",
                                    }}
                                  >
                                    Download
                                    <div
                                      className="tooltip-arrow"
                                      data-popper-arrow
                                    ></div>
                                  </div>
                                </div>
                              </>
                            )}
                          </td>
                          <td
                            style={{ padding: "5px" }}
                            className="flex items-center justify-center tooltip-style"
                          >
                            <div className="relative group">
                              <IconButton
                                onClick={() =>
                                  handleGiveFeedBack(order_id, feedback)
                                }
                              >
                                {feedback ? (
                                  <FaStar
                                    className={`inline-block h-9 w-9 cursor-pointer fill-[var(--primary)]`}
                                  />
                                ) : (
                                  <CiStar
                                    className={`inline-block h-9 w-9 cursor-pointer fill-[var(--primary)]`}
                                  />
                                )}
                              </IconButton>

                              <div
                                role="tooltip"
                                className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--primary)] text-white rounded-md shadow-sm px-3 py-2 text-sm text-nowrap"
                                style={{
                                  top: "-25px",
                                  left: "50%",
                                  transform: "translateX(-50%)",
                                }}
                              >
                                {feedback ? "View Feedback" : "Give Feedback"}
                                <div
                                  className="tooltip-arrow"
                                  data-popper-arrow
                                ></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td className="text-center col-span-full">
                        No record found!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-white flex items-center justify-between px-8 max-w-full">
              {totalRows > 10 && (
                <>
                  <p className="current-page-num">
                    Showing{" "}
                    {(currentPage === 1 && "1") || (currentPage - 1) * 10 + 1}{" "}
                    to {currentPage === count ? totalRows : currentPage * 10}{" "}
                    entries
                  </p>
                  <div className="flex items-center gap-4">
                    <button
                      className={`pagination-btn ${
                        activeBtn === -2 && "active-page"
                      }`}
                      onClick={() => {
                        if (currentPage !== 1) {
                          handlePageClick(1);
                          setActiveBtn(-2);
                        }
                      }}
                    >
                      <FaAngleDoubleLeft className="page-icon" />
                    </button>
                    <button
                      className={`pagination-btn ${
                        activeBtn === -1 && "active-page"
                      }`}
                      onClick={() => {
                        if (currentPage !== 1) {
                          handlePageClick(currentPage - 1);
                          setActiveBtn(-1);
                        }
                      }}
                    >
                      <FaAngleLeft className="page-icon" />
                    </button>
                    <button
                      className={`pagination-btn ${
                        activeBtn === 1 && "active-page"
                      }`}
                      onClick={() => {
                        if (currentPage !== 1) {
                          handlePageClick(1);
                          setActiveBtn(1);
                        }
                      }}
                    >
                      <span className="page-num">1</span>
                    </button>
                    {count > 1 && (
                      <button
                        className={`pagination-btn ${
                          activeBtn === 2 && "active-page"
                        }`}
                        onClick={() => {
                          if (currentPage !== 2) {
                            handlePageClick(2);
                            setActiveBtn(2);
                          }
                        }}
                      >
                        <span className="page-num">2</span>
                      </button>
                    )}
                    {count > 2 && (
                      <button
                        className={`pagination-btn ${
                          activeBtn === 3 && "active-page"
                        }`}
                        onClick={() => {
                          if (currentPage !== 3) {
                            handlePageClick(3);
                            setActiveBtn(3);
                          }
                        }}
                      >
                        <span className="page-num">3</span>
                      </button>
                    )}
                    {count > 3 && (
                      <>
                        <button className="pagination-btn border-transparent">
                          <span className="page-num">...</span>
                        </button>
                        <button
                          className={`pagination-btn ${
                            activeBtn === count && "active-page"
                          }`}
                          onClick={() => {
                            if (currentPage !== count) {
                              handlePageClick(count);
                              setActiveBtn(count);
                            }
                          }}
                        >
                          <span className="page-num">{count}</span>
                        </button>
                      </>
                    )}
                    <button
                      className={`pagination-btn ${
                        activeBtn === 100 && "active-page"
                      }`}
                    >
                      <FaAngleRight
                        className="page-icon"
                        onClick={() => {
                          if (currentPage !== count) {
                            handlePageClick(currentPage + 1);
                            setActiveBtn(100);
                          }
                        }}
                      />
                    </button>
                    <button
                      className={`pagination-btn ${
                        activeBtn === 200 && "active-page"
                      }`}
                    >
                      <FaAngleDoubleRight
                        className="page-icon"
                        onClick={() => {
                          if (currentPage !== count) {
                            handlePageClick(count);
                            setActiveBtn(200);
                          }
                        }}
                      />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {modelIsOpen && (
        <FeedbackModel
          order_id={modelProp}
          setModelIsOpen={setModelIsOpen}
          feedback={currentFb}
        />
      )}
    </>
  );
};

export default Home;
