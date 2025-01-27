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
    1: "Pending payemtn",
    2: "Full payement received",
    3: "Partial payement received",
  };

  const hanldeInvoiceDownload = async () => {
    await downloadInvoice(location.state.order_id);
  };

  if (loadingComponent) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-[1.8rem] leading-[4rem] text-[var(--black)] font-semibold py-4 px-6 rounded-xl bg-white border border-[#b9bccf4d] flex items-center justify-between shadow-sm">
        <span>Order Details : #{location.state.order_id}</span>
        <span
          className="flex justify-center items-center h-14 w-14 p-3 bg-gray-100 rounded-full border border-[#b9bccf4d] cursor-pointer"
          onClick={hanldeInvoiceDownload}
        >
          {loading ? (
            <span className="inline-block h-7 w-7 rounded-full border-2 border-indigo-100 border-t-indigo-600 border-r-indigo-600 animate-spin"></span>
          ) : (
            <IoMdDownload className="h-full w-full fill-[var(--primary)]" />
          )}
        </span>
      </div>

      <div className="flex justify-between items-start">
        <div className="basis-[48.8%] space-y-8">
          <div className="py-8 px-12 order-list-container flex flex-col gap-6 shadow-sm">
            <div className="text-[1.6rem] text-[var(--black)] font-medium mb-2">
              Order items
            </div>
            {order?.items?.map((item) => {
              const { item_id, product, category, quantity, service } = item;
              return (
                <div
                  key={item_id}
                  className="border border-[#b9bccf4d] rounded-lg py-3 px-4 bg-slate-50"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex justify-start gap-6">
                      <img
                        src={product.image}
                        alt="product image"
                        className="inline-block h-20 w-20 rounded-lg border"
                      />
                      <div className="flex flex-col justify-evenly">
                        <h3 className="text-[1.2rem] font-medium leading-[1.5]">
                          {product.name} ({`${quantity}x`})
                        </h3>
                        <h4 className="text-[1.2rem] text-[#78829d] font-normal leading-[1.5]">
                          Category: {category.name}
                        </h4>
                      </div>
                    </div>
                    <span className="text-[1.1rem] text-[var(--secondary)] border-[0.5px] border-green-500 p-2 rounded-lg">
                      Service : {service?.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cus-info-container shadow-sm">
            <div className="text-[1.6rem] text-[var(--black)] font-medium py-5 px-12 border-b border-[#b9bccf4d]">
              Order summary
            </div>
            <div className="text-[1.4rem] text-[var(--black)] font-medium py-8 px-12">
              <div className="grid grid-cols-[20rem_1fr] gap-8 font-normal">
                <span className="inline-block text-[#676788]">Sub Total</span>
                <span>₹{order?.sub_total || "0"}</span>
                <span className="inline-block text-[#676788]">
                  Shipping charges
                </span>
                <span>₹{order?.shipping_charges || "0"}</span>
                <span className="inline-block text-[#676788]">
                  Express Delivery Charges
                </span>
                <span>₹{order?.express_delivery_charges || "0"}</span>
                <span className="inline-block text-[#676788]">
                  Kasar amount
                </span>
                <span>₹{order?.kasar_amount || "0"}</span>
                <span className="inline-block text-[#676788]">Coupon Code</span>
                <span>{order?.coupon_code || "N/A"}</span>
                <span className="inline-block text-[#676788]">
                  Coupon Discount
                </span>
                <span>₹{order?.coupon_discount || "0"}</span>
                <span className="inline-block text-[#676788]">Total</span>
                <span>₹{order?.total || "0"}</span>
                {}
              </div>
            </div>
          </div>
        </div>

        <div className="basis-[48.8%] space-y-8">
          <div className="common-container shadow-sm">
            <div className="text-[1.6rem] text-[var(--black)] font-medium py-5 px-12 border-b border-[#b9bccf4d]">
              Customer information
            </div>
            <div className="text-[1.4rem] text-[var(--black)] font-medium py-8 px-12">
              <div className="grid grid-cols-[20rem_1fr] gap-8 font-normal">
                <span className="info-label">Name</span>
                <span className="info-ans">
                  {order?.user?.first_name + " " + order?.user?.last_name}
                </span>
                <span className="info-label">Email</span>
                <span className="info-ans">{order?.user?.email}</span>
                <span className="info-label">Mobile Number</span>
                <span className="info-ans">{order?.user?.mobile_number}</span>
              </div>
            </div>
          </div>

          <div className="common-container py-6 px-12 space-y-4 shadow-sm">
            <h3 className="text-[1.6rem] text-[var(--black)] font-medium capitalize">
              shipping address
            </h3>
            <p className="info-label address">{order?.address_details}</p>
          </div>

          <div className="common-container shadow-sm">
            <div className="text-[1.6rem] text-[var(--black)] font-medium py-5 px-12 border-b border-[#b9bccf4d]">
              Payement information
            </div>
            <div className="text-[1.4rem] text-[var(--black)] font-medium py-8 px-12">
              <div className="grid grid-cols-[20rem_1fr] gap-8 font-normal">
                <span className="info-label">payement type</span>
                <span className="info-ans">{ptMap[order?.payment_type]}</span>
                <span className="info-label">payement status</span>
                <span className="info-ans">{psMap[order?.payment_status]}</span>
                <span className="info-label">Transaction ID</span>
                <span className="info-ans">
                  {order?.transaction_id || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="common-container shadow-sm">
            <div className="text-[1.6rem] text-[var(--black)] font-medium py-5 px-12 border-b border-[#b9bccf4d]">
              Estimated Delivery & Pickup
            </div>
            <div className="text-[1.4rem] text-[var(--black)] font-medium py-8 px-12">
              <div className="grid grid-cols-[20rem_1fr] gap-8 font-normal">
                <span className="info-label">Estimated Pickup Time:</span>
                <span className="info-ans">
                  {dayjs(order?.estimated_pickup_time).format("DD/MM/YYYY")}
                </span>
                <span className="info-label">Estimated Delivery Time:</span>
                <span className="info-ans">
                  {dayjs(order?.estimated_delivery_time).format("DD/MM/YYYY")}
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
