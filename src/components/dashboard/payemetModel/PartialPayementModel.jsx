import PropTypes, { element } from "prop-types";
import "./ppmodel.css";
import { IoClose } from "react-icons/io5";
import useFetchDueOrders from "../../../hooks/payement/useFetchDueOrders";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import useGetTransactionId from "../../../hooks/payement/useGetTransactionId";
import { useSelector } from "react-redux";
import useVerifyPayement from "../../../hooks/payement/useVerifyPayement";
import useClearDue from "../../../hooks/cleardue/useClearDue";

const PartialPayementModel = ({ setModleHandler }) => {
  const { dueData, loading } = useFetchDueOrders();
  const userData = useSelector((state) => state?.user?.user);

  const [payAmount, setPayAmount] = useState(0);
  const [dueOrders, setDueOrders] = useState([]);
  const [open, setOpen] = useState(false);

  const { getTransactionId } = useGetTransactionId();
  const { verifyPayement } = useVerifyPayement();
  const { clearDue } = useClearDue();

  const hanldePay = async () => {
    setOpen(true);
    const razorpay_order_id = await getTransactionId(payAmount);

    if (!razorpay_order_id) {
      toast.error("Failed to generated transaction id !", {
        className: "toast-error",
      });
      setOpen(false);
      return;
    } else {
      try {
        const { first_name, last_name, mobile_number, email } = userData;

        const options = {
          key: import.meta.env.RAZORPAY_KEY,
          aount: payAmount * 100,
          currency: "INR",
          description: "Due Payement",
          order_id: razorpay_order_id,
          handler: async function (response) {
            setOpen(true);
            const res = await verifyPayement(response);
            if (!res.status) {
              setOpen(false);
              return;
            } else {
              const result = await clearDue(
                payAmount,
                razorpay_order_id,
                dueOrders
              );
              if (result.status) {
                setOpen(false);
                setModleHandler(false);
                // setRefetch((prev) => !prev);
              }
              setOpen(false);
            }
          },
          prefill: {
            name: first_name + " " + last_name,
            email: email,
            contact: mobile_number,
          },
          theme: {
            color: "#161F5F",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch {
        toast.error(
          "Failed to initiate online payement please try again letter!",
          {
            className: "toast-error",
          }
        );
      } finally {
        setOpen(false);
      }
    }
  };

  const onCheckBoxCheckChange = (e, record) => {
    const { order_id, remaining_amount } = record;

    setDueOrders((prev) => {
      const updatedOrders = prev || [];
      if (e.target.checked) {
        if (updatedOrders.includes(order_id)) {
          return prev;
        }
        setPayAmount((prevAmount) => prevAmount + remaining_amount);
        return [...updatedOrders, order_id];
      } else {
        setPayAmount((prevAmount) => prevAmount - remaining_amount);
        return updatedOrders.filter((id) => id !== order_id);
      }
    });
  };

  const { result } = dueData;
  return (
    <>
      <div className="fixed inset-0 top-0 bg-black bg-opacity-75 grid place-items-center">
        <div className="border border-[#b9bccf4d] rounded-xl bg-white px-14 py-16 w-full max-w-[1000px] relative laptop:px-12 laptop:py-14 tab-l:rounded-lg tab-l:px-10 tab-l:py-12  tab-s:gap-6  mb-l:gap-4">
          <button
            type="button"
            title="close"
            className="absolute top-4 right-4 border border-gray-300 rounded-md p-1 inline-flex items-center justify-center text-gray-400 focus:outline-none focus:border-indigo-500 shadow-2xl laptop:right-3 laptop:top-3 tab-s:right-2 tab-s:top-2"
            onClick={() => setModleHandler(false)}
          >
            <IoClose className="h-8 w-8 tab-s:h-6 tab-s:w-6" />
          </button>
          <div className="flex justify-between items-center mb-8 mt-2">
            <h2 className="text-[2.25rem] leading-[1.75] capitalize text-[var(--black)] font-semibold laptop:text-[1.8rem] tab-s:text-[1.6rem]">
              Orders
            </h2>
            <div className="flex justify-center items-center gap-8">
              <span className="text-[1.4rem] font-medium text-green-700">
                Amount: ₹{payAmount}
              </span>
              <button
                onClick={hanldePay}
                disabled={payAmount === 0}
                className={`${
                  payAmount === 0 ? "disabled-ppd-btn" : ""
                } ppd-btn`}
              >
                Pay
              </button>
            </div>
          </div>
          {!loading ? (
            <div className="border border-[#b9bccf4d] rounded-lg overflow-hidden">
              <table className="pp-table">
                <thead className="border-b border-[#b9bccf4d]">
                  <tr>
                    <th className="w-40 min-w-40">check</th>
                    <th className="min-w-48">order id</th>
                    <th className="min-w-[18rem]">booking date</th>
                    <th className="min-w-[15rem]">delivery date</th>
                    <th className="min-w-40">Total</th>
                    <th className="min-w-40">Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  {result.length > 0 ? (
                    result.map((record, index) => {
                      const {
                        order_id,
                        created_at,
                        estimated_delivery_time,
                        total,
                        remaining_amount,
                      } = record;
                      return (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              onChange={(e) => onCheckBoxCheckChange(e, record)}
                              className="w-8 h-8 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-0"
                            />
                          </td>
                          <td>{order_id}</td>
                          <td>
                            {dayjs(created_at).format("DD/MM/YYYY, hh:mm A")}
                          </td>
                          <td>
                            {dayjs(estimated_delivery_time).format(
                              "DD/MM/YY, hh:mm A"
                            )}
                          </td>
                          <td>₹{total}</td>
                          <td>₹{remaining_amount}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="font-medium text-center">
                        No Due Order Found!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

PartialPayementModel.propTypes = {
  setModleHandler: PropTypes.func.isRequired,
};

export default PartialPayementModel;
