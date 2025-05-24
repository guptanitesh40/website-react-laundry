/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetOrderDetail from "../../hooks/dashboard/useGetOrderDetail";
import dayjs from "dayjs";
import useDownloadInvoice from "../../hooks/invoice/useDownloadInvoice";
import Loading from "./Loading";
import { IoMdDownload } from "react-icons/io";

const ViewOrder = () => {
  const [loadingComponent, setLoadingComponent] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { getOrderDetail } = useGetOrderDetail();
  const [order, setOrder] = useState([]);
  const { downloadInvoice, loading } = useDownloadInvoice();

  useEffect(() => {
    if (!location?.state) {
      navigate("/dashboard/home");
    } else {
      const fetchOrderDetail = async () => {
        const result = await getOrderDetail(location.state.order_id);
        if (result) {
          setOrder(result);
          setLoadingComponent(false);
        }
      };
      fetchOrderDetail();
    }
  }, [location, navigate]);

  const ptMap = {
    1: "Cash on delivery",
    2: "Online payement",
  };

  const psMap = {
    1: "Pending payment",
    2: "Full payment received",
    3: "Partial payment received",
  };

  const hanldeInvoiceDownload = async () => {
    await downloadInvoice(location.state.order_id);
  };

  const {
    order_id,
    express_delivery_charges,
    items = [],
    sub_total = 0,
    normal_delivery_charges,
    kasar_amount,
    coupon_code,
    coupon_discount = 0,
    total = 0,
    order_status,
    branch = {},
    address_details,
    payment_type,
    payment_status,
    transaction_id,
    estimated_pickup_time,
    estimated_delivery_time,
    order_status_name,
    gst_company_name,
    gstin,
  } = order;

  const { branch_name, branch_phone_number, branch_email } = branch;

  if (loadingComponent) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-8 tab-s:gap-6">
      <div className="text-[1.8rem] leading-[4rem] text-[var(--black)] font-semibold py-4 px-6 rounded-xl bg-white border border-[#b9bccf4d] flex items-center justify-between shadow-sm laptop-s:text-[1.6rem] laptop-s:leading-[3rem] laptop-s:rounded-lg tab-s:p-4 tab-s:text-[1.5rem]">
        <span>Order Details : #{order_id}</span>
        {order_status === 12 ||
          (order_status === 13 && (
            <span className="self-center border border-secondary text-[1.4rem] leading-[1.25] font-normal rounded-lg text-secondary p-3">
              This order is cancelled
            </span>
          ))}

        <div className="flex items-center gap-5">
          <span
            className={`px-4 py-1 rounded-lg font-medium text-[1rem] leading-[2.4rem] order-status-label-${
              order_status >= 4 && order_status < 9 ? 0 : order_status
            }`}
          >
            {order_status_name}
          </span>
          <span
            className="flex justify-center items-center h-14 w-14 p-3 bg-gray-100 rounded-full border border-[#b9bccf4d] cursor-pointer laptop-s:h-12 laptop-s:w-12 laptop-s:p-2"
            onClick={hanldeInvoiceDownload}
          >
            {loading ? (
              <span className="inline-block h-7 w-7 rounded-full border-2 border-indigo-100 border-t-indigo-600 border-r-indigo-600 animate-spin"></span>
            ) : (
              <IoMdDownload className="h-full w-full fill-[var(--primary)]" />
            )}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 laptop:grid-cols-1 gap-8 tab-s:gap-6">
        <div className="space-y-8 tab-s:space-y-6">
          <div className="py-10 px-12 common-container shadow-sm tab-s:py-8 tab-s:px-10 tab:py-6 tab:px-8 mb-l:py-4 mb-l:px-6">
            <div className="flex justify-between items-center gap-8 mb-4">
              <div className="text-[1.6rem] text-[var(--black)] font-medium tab-l:text-[1.5rem] tab-s:text-[1.4rem]">
                Order items
              </div>
              <span className="text-[#676788] text-2xl font-medium tab-l:text-xl tab-s:text-lg">
                Total items : {items?.length}
              </span>
            </div>
            <div className="flex flex-col gap-6 max-h-[50rem] overflow-y-auto -mr-12 pr-12 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 tab-s:-mr-10 tab-s:pr-10 tab:gap-4 tab:-mr-8 tab:pr-8 tab:overflow-x-auto tab:max-h-[37.5rem] mb-l:-mr-6 mb-l:pr-6 mb-l:max-h-[51rem]">
              {items?.map((item) => {
                const { item_id, product, category, quantity, service } = item;
                return (
                  <div
                    key={item_id}
                    className="border border-[#b9bccf4d] rounded-lg py-3 px-4 bg-slate-50 tab:bg-"
                  >
                    <div className="flex justify-between items-center mb-l:gap-3 mb-l:flex-col">
                      <div className="flex justify-start gap-6 tab:gap-4 mb-l:flex-col mb-l:items-center mb-l:gap-3">
                        <img
                          src={product.image}
                          alt="product image"
                          className="inline-block h-24 w-24 rounded-lg tab:h-20 tab:w-20 mb-l:h-24 mb-l:w-24"
                        />
                        <div className="flex flex-col justify-evenly mb-l:gap-2 mb-l:items-center">
                          <h3 className="text-[1.2rem] font-medium leading-[1.5]">
                            {product.name}
                          </h3>
                          <h4 className="text-[1.2rem] text-[#78829d] font-normal leading-[1.5]">
                            Category: {category.name}
                          </h4>
                          <h4 className="text-[1.2rem] text-[#78829d] font-normal leading-[1.5]">
                            Qty: {quantity}
                          </h4>
                        </div>
                      </div>
                      <span className="text-lg text-[var(--secondary)] border-[0.5px] border-green-500 p-2 rounded-lg">
                        <span className="tab:hidden mb-l:inline-block">
                          Service :{" "}
                        </span>
                        <span>{service?.name}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="common-container shadow-sm">
            <div className="text-[1.6rem] text-[var(--black)] font-medium py-6 px-12 border-b border-[#b9bccf4d] tab-l:text-[1.5rem] tab-s:px-10 tab-s:text-[1.4rem] tab:px-8 mb-l:py-4 mb-l:px-6">
              Order summary
            </div>
            <div className="py-8 px-12 tab-s:px-10 tab:px-8 tab:py-6 mb-l:py-4 mb-l:px-6">
              <div className="grid grid-cols-[20rem_1fr] gap-8 font-normal tab-s:grid-cols-[17.5rem_1fr] tab:gap-6 mb-l:gap-4 mb-l:grid-cols-[repeat(auto-fill,_minmax(12.5rem,_1fr))]">
                <span className="info-label">Sub Total</span>
                <span className="info-ans">₹{sub_total || "0"}</span>
                {normal_delivery_charges > 0 && (
                  <>
                    <span className="info-label">Shipping charges</span>
                    <span className="info-ans">₹{normal_delivery_charges}</span>
                  </>
                )}

                {express_delivery_charges > 0 && (
                  <>
                    <span className="info-label">Express Delivery Charges</span>
                    <span className="info-ans">
                      ₹{express_delivery_charges}
                    </span>
                  </>
                )}

                {kasar_amount > 0 && (
                  <>
                    <span className="info-label">Kasar amount</span>
                    <span className="info-ans">₹{kasar_amount}</span>
                  </>
                )}

                {coupon_code && (
                  <>
                    <span className="info-label">Coupon Code</span>
                    <span className="info-ans">{coupon_code}</span>
                  </>
                )}

                {coupon_discount > 0 && (
                  <>
                    <span className="info-label">Coupon Discount</span>
                    <span className="info-ans">₹{coupon_discount || "0"}</span>
                  </>
                )}

                <span className="info-label">Total</span>
                <span className="info-ans">₹{total || "0"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 tab-s:space-y-6">
          <div className="common-container shadow-sm">
            <div className="text-[1.6rem] text-[var(--black)] font-medium py-6 px-12 border-b border-[#b9bccf4d] tab-l:text-[1.5rem] tab-s:px-10 tab-s:text-[1.4rem] tab:px-8 mb-l:py-4 mb-l:px-6">
              Branch information
            </div>
            <div className="text-[1.4rem] text-[var(--black)] font-medium py-8 px-12 tab-s:px-10 tab:px-8 tab:py-6 mb-l:py-4 mb-l:px-6">
              <div className="grid grid-cols-[20rem_1fr] gap-8 font-normal tab-s:grid-cols-[15rem_1fr] tab:grid-cols-[12.5rem_1fr] tab:gap-6 mb-l:gap-4 mb-l:grid-cols-[repeat(auto-fill,_minmax(13.5rem,_1fr))]">
                {!branch && (
                  <>
                    <span className="info-label">No branch assigned</span>
                  </>
                )}
                {branch_name && (
                  <>
                    <span className="info-label">Name</span>
                    <span className="info-ans">{branch_name}</span>
                  </>
                )}
                {branch_name && (
                  <>
                    <span className="info-label">Email</span>
                    <span className="info-ans">{branch_email}</span>
                  </>
                )}
                {branch_phone_number && (
                  <>
                    <span className="info-label">Mobile Number</span>
                    <span className="info-ans">{branch_phone_number}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="common-container py-8 px-12 space-y-4 shadow-sm tab-s:px-10 tab:px-8 tab:py-6 tab:space-y-3 mb-l:py-4 mb-l:px-6">
            <h3 className="text-[1.6rem] text-[var(--black)] font-medium capitalize tab-l:text-[1.5rem] tab-s:text-[1.4rem]">
              shipping address
            </h3>
            <p className="info-label address">{address_details}</p>
          </div>

          <div className="common-container shadow-sm">
            <div className="text-[1.6rem] text-[var(--black)] font-medium py-6 px-12 border-b border-[#b9bccf4d] tab-l:text-[1.5rem] tab-s:px-10 tab-s:text-[1.4rem] tab:px-8 mb-l:py-4 mb-l:px-6">
              Payement information
            </div>
            <div className="py-8 px-12 tab-s:px-10 tab:px-8 tab:py-6 mb-l:py-4 mb-l:px-6">
              <div className="grid grid-cols-[20rem_1fr] gap-8 font-normal tab-s:grid-cols-[15rem_1fr] tab:grid-cols-[12.5rem_1fr] tab:gap-6 mb-l:gap-4 mb-l:grid-cols-[repeat(auto-fill,_minmax(12.5rem,_1fr))]">
                <span className="info-label">payment type</span>
                <span className="info-ans">{ptMap[payment_type]}</span>
                <span className="info-label">payment status</span>
                <span className="info-ans">{psMap[payment_status]}</span>
                <span className="info-label">Transaction ID</span>
                <span className="info-ans">{transaction_id || "N/A"}</span>

                {gst_company_name && (
                  <>
                    <span className="info-label">Company Name</span>
                    <span className="info-ans">{gst_company_name}</span>
                  </>
                )}

                {gstin && (
                  <>
                    <span className="info-label">GSTIN</span>
                    <span className="info-ans">{gstin}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="common-container shadow-sm">
            <div className="text-[1.6rem] text-[var(--black)] font-medium py-6 px-12 border-b border-[#b9bccf4d] tab-l:text-[1.5rem] tab-s:px-10 tab-s:text-[1.4rem] tab:px-8 mb-l:py-4 mb-l:px-6">
              Estimated Delivery & Pickup
            </div>
            <div className="py-8 px-12 tab-s:px-10 tab:px-8 tab:py-6 mb-l:py-4 mb-l:px-6">
              <div className="grid grid-cols-[20rem_1fr] gap-8 font-normal tab-s:grid-cols-[17.5rem_1fr] tab:grid-cols-[16rem_1fr] tab:gap-6 mb-l:gap-4 mb-l:grid-cols-[repeat(auto-fill,_minmax(15rem,_1fr))]">
                {order_status !== 11 && (
                  <>
                    <span className="info-label">Estimated Pickup Time:</span>
                    <span className="info-ans">
                      {dayjs(estimated_pickup_time).format("DD/MM/YYYY")}
                    </span>
                  </>
                )}

                <span className="info-label">Estimated Delivery Time:</span>
                <span className="info-ans">
                  {dayjs(estimated_delivery_time).format("DD/MM/YYYY")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
