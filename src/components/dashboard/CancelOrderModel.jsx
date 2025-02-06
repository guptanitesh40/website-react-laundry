import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import useCancelOrder from "../../hooks/order/useCancelOrder";

const CancelOrderModel = ({ setCancelModelIsOpen, order_id, setRefetch }) => {
  const { cancelOrder, loading } = useCancelOrder();
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!reason.trim()) {
      setError("Cancellation reason is required");
      return;
    }

    if (reason.trim().length >= 512) {
      setError("Reason cannot exceed 512 characters");
      return;
    }

    setError("");

    const result = await cancelOrder(order_id, reason);
    if (result?.status) {
      setCancelModelIsOpen(false);
      setRefetch((prev) => !prev);
    }
  };

  return (
    <div className="fixed inset-0 top-0 bg-black bg-opacity-75 flex justify-center items-center mb-l:p-8 mb:p-4">
      <div className="border border-gray-300 rounded-xl bg-white px-14 py-16 flex flex-col gap-14 w-[40rem] relative laptop:px-12 laptop:py-14 laptop:w-[37.5rem] laptop:gap-12 tab-l:rounded-lg tab-l:px-10 tab-l:py-12 tab-l:w-[35rem] tab-l:gap-10 tab-s:gap-8">
        <button
          type="button"
          title="close"
          className="absolute top-4 right-4 border border-gray-300 rounded-md p-1 inline-flex items-center justify-center text-gray-400 focus:outline-none focus:border-indigo-500 shadow-2xl laptop:right-3 laptop:top-3 tab-s:right-2 tab-s:top-2"
          onClick={() => setCancelModelIsOpen(false)}
        >
          <IoClose className="h-7 w-7 tab-s:h-6 tab-s:w-6" />
        </button>

        <div className="text-[2rem] capitalize text-[var(--black)] font-semibold laptop:text-[1.8rem] tab-s:text-[1.6rem]">
          Cancel Order #{order_id}
        </div>

        <div className="flex flex-col gap-10 laptop:gap-8 tab-s:gap-6">
          <div className="flex flex-col gap-4 tab-s:gap-3">
            <label
              htmlFor="reason"
              className="text-[1.6rem] text-[var(--black)] laptop:text-[1.4rem]"
            >
              Reason for Cancellation
            </label>
            <div>
              <textarea
                id="reason"
                rows={6}
                value={reason}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                onChange={(e) => setReason(e.target.value)}
                className="w-full text-[1.4rem] leading-[2.25rem] text-[var(--black)] border border-indigo-200 focus:border-indigo-500 focus:outline-none rounded-lg p-3 tab-s:leading-[2.1rem] tab-s:p-2"
              ></textarea>
              {error && (
                <span className="block text-xl leading-1 text-red-500 tab-s:text-lg">
                  {error}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-start items-center gap-8 tab-s:gap-6">
            <button
              className="bg-primary text-white font-medium w-[8.5rem] h-[3.75rem] text-[1.4rem] leading-[1.25] rounded-lg capitalize flex justify-center items-center"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span className="inline-block h-8 w-8 border-2 border-white/25 border-r-white rounded-full animate-spin"></span>
              ) : (
                <span>submit</span>
              )}
            </button>
            <button
              className="text-[var(--black)] font-medium w-[8.5rem] h-[3.75rem] text-[1.4rem] leading-[1.25] rounded-lg capitalize flex justify-center items-center border border-gray-300"
              onClick={() => setCancelModelIsOpen(false)}
            >
              <span>cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

CancelOrderModel.propTypes = {
  setCancelModelIsOpen: PropTypes.func.isRequired,
  order_id: PropTypes.number.isRequired,
  setRefetch: PropTypes.func.isRequired,
};

export default CancelOrderModel;
