import "./order.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState({});
  const [orderDate, setOrderDate] = useState("");

  const payementMap = {
    1: "Cash on delivery",
    2: "Online Payement",
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/cart");
    } else {
      setOrderData(location?.state?.result);
      const date = new Date(location?.state?.result?.created_at);
      const day = date.getDate();
      const month = date.toLocaleString("en-US", { month: "short" });
      const year = date.getFullYear();
      setOrderDate(`${day} ${month} ${year}`);
      setLoading(false);
    }
  }, [location, location.state, navigate]);

  if (loading) {
    return (
      <div className="py-24 laptop-l:py-20 laptop:py-16 tab-s:py-12 tab:px-10 mb-l:p-8 mb:p-6">
        <div className="mx-auto order-container flex justify-center items-center min-h-[55rem] tab-s:min-h-[50rem] mb-l:min-h-[45rem] mb:min-h-[40rem]">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-24 h-24 text-black/10 animate-spin fill-primary mb-l:w-20 mb-l:h-20"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <section className="bg-white antialiased py-24 laptop-l:py-20 laptop:py-16 tab-s:py-12 tab:px-10 mb-l:p-8 mb:p-6">
        <div className="mx-auto order-container flex flex-col gap-10 tab-l:gap-8 mb-l:gap-6 mb:gap-4">
          <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 tab-s:text-[1.6rem] tab-s:leading-[1.5]">
            Thanks for your order!
          </h2>
          <p className="text-[1.5rem] leading-[1.75] font-normal text-[var(--black)] tab-s:text-[1.4rem] mb-l:text-[1.25rem]">
            Your order{" "}
            <span className="font-bold text-[var(--primary)]">{`#${orderData?.order_id}`}</span>{" "}
            will be processed within 24 hours during working days. We will
            notify you by email once your order has been shipped.
          </p>
          <div className="rounded-lg border border-gray-50 bg-[#F9FAFB] p-8 mb-6 flex flex-col gap-8 text-[1.5rem] tab-s:text-[1.4rem] tab-s:p-7 tab-s:gap-6 tab:mb-4 mb-l:p-6 mb-l:text-[1.25rem] mb-l:mb-2 mb:p-4">
            <dl className="flex items-center justify-between gap-8 mb-l:flex-col mb-l:gap-1 mb-l:items-start">
              <dt className="font-medium text-gray-500">Name</dt>
              <dd className="font-medium text-[var(--black)] sm:text-end">
                {orderData?.user?.first_name + " " + orderData?.user?.last_name}
              </dd>
            </dl>
            <dl className="flex items-center justify-between gap-8 mb-l:flex-col mb-l:gap-1 mb-l:items-start">
              <dt className="font-medium text-gray-500">Phone</dt>
              <dd className="font-medium text-[var(--black)] sm:text-end">
                +91 {orderData?.user?.mobile_number}
              </dd>
            </dl>
            <dl className="flex items-start justify-between gap-8 tab:text-right mb-l:flex-col mb-l:gap-1 mb-l:items-start mb-l:text-left">
              <dt className="font-medium text-gray-500">Address</dt>
              <dd className="font-medium text-[var(--black)] sm:text-end mb-l:grow">
                {orderData?.address_details}
              </dd>
            </dl>
            <dl className="flex items-center justify-between gap-8  mb-l:flex-col mb-l:gap-1 mb-l:items-start">
              <dt className="font-medium text-gray-500">Date</dt>
              <dd className="font-medium text-[var(--black)]">{orderDate}</dd>
            </dl>
            <dl className="flex items-center justify-between gap-8 mb-l:flex-col mb-l:gap-1 mb-l:items-start">
              <dt className="font-medium text-gray-500">Payment Method</dt>
              <dd className="font-medium text-[var(--black)] sm:text-end">
                {payementMap[location?.state?.paymentMethod] || "N/A"}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-8 mb-l:flex-col mb-l:gap-1 mb-l:items-start">
              <dt className="font-medium text-gray-500">Total Amount</dt>
              <dd className="font-medium text-[var(--black)] sm:text-end">
                ₹ {orderData?.total || 0}
              </dd>
            </dl>
            {orderData?.transaction_id && (
              <dl className="flex items-center justify-between gap-8 mb-l:flex-col mb-l:gap-1 mb-l:items-start">
                <dt className="font-medium text-gray-500">Transaction Id</dt>
                <dd className="font-medium text-[var(--black)] sm:text-end">
                  {orderData?.transaction_id}
                </dd>
              </dl>
            )}
          </div>
          <div className="flex items-center justify-start gap-8 mb-l:gap-4 mb-l:flex-wrap mb:justify-center">
            <Link to="/dashboard/home" className="to-btn">
              Track your order
            </Link>
            <Link to="/services" className="rs-btn">
              Return to shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }
};

export default Order;
