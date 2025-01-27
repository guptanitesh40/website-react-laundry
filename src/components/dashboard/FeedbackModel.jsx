import "./feedbackmodel.css";
import PropTypes, { oneOfType } from "prop-types";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import useSendFeedback from "../../hooks/feedback/useSendFeedback";

const FeedbackModel = ({ order_id, setModelIsOpen, feedback }) => {
  const { sendFeedBack, loading } = useSendFeedback();
  const [error, setError] = useState({});
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isFbAvaileble, setIsFbAvaileble] = useState(false);

  useEffect(() => {
    if (feedback) {
      const { comment, rating } = feedback;
      setMessage(comment);
      setRating(rating);
      setIsFbAvaileble(true);
    }
  }, [feedback, isFbAvaileble]);

  const handleClick = (value) => {
    if (isFbAvaileble) {
      return;
    }
    setRating(value);
  };

  const handleSubmit = async () => {
    const newError = {};

    if (rating === 0) {
      newError.star = "Please select at least one star.";
    }

    if (message === "") {
      newError.message = "Please enter your message.";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }
    setError({});
    const param = {
      rating,
      comment: message,
      order_id: order_id,
      is_publish: 1,
    };
    const result = await sendFeedBack(param);
    if (result) {
      setModelIsOpen(false);
    }
  };
  return (
    <div className="feedback-model-container bg-black bg-opacity-70">
      <div className="border border-[#b9bccf4d] rounded-xl bg-white px-14 py-16 flex flex-col gap-10 w-[40rem] relative">
        <button
          type="button"
          title="close"
          className="absolute top-2 right-2 border border-gray-300 shadow-sm rounded-md p-2 inline-flex items-center justify-center text-gray-400 focus:outline-none focus:border-indigo-500"
          onClick={() => setModelIsOpen(false)}
        >
          <span className="sr-only">Close menu</span>
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="text-3xl capitalize text-[var(--primary)] font-semibold">
          Order Id : {order_id}
        </div>
        <div>
          <div className="rating-star-container flex gap-2">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <FaStar
                  key={index}
                  onClick={() => handleClick(index + 1)}
                  className={`star cursor-pointer text-3xl ${
                    index < rating ? "fill-[#FF2E17]" : "fill-[#B9BCCF]"
                  }`}
                />
              ))}
          </div>
          {error.star && (
            <span className="block mt-2 text-lg leading-1 text-red-500">
              {error.star}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <label
            htmlFor="message"
            className="text-[1.4rem] leading-[2rem] text-[var(--black)]"
          >
            Write a Review
          </label>
          <div>
            <textarea
              id="message"
              rows={4}
              value={message}
              readOnly={isFbAvaileble}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-[1.4rem] leading-[2.4rem] text-[var(--black)] border-[1.5px] border-indigo-200 focus:border-indigo-500 focus:outline-none rounded-xl p-4"
            ></textarea>
            {error.message && (
              <span className="block text-lg leading-1 text-red-500">
                {error.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <button
            className={`submit-review ${
              isFbAvaileble ? "disabled-submit" : ""
            }`}
            onClick={handleSubmit}
            disabled={!!isFbAvaileble}
          >
            {loading ? (
              <span className="inline-block h-9 w-9 border-2 border-white border-r-transparent rounded-full animate-spin my-[-5px] mx-[1.5rem]"></span>
            ) : (
              "submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

FeedbackModel.propTypes = {
  order_id: PropTypes.number.isRequired,
  setModelIsOpen: PropTypes.func.isRequired,
  feedback: oneOfType([
    PropTypes.string,
    PropTypes.shape({
      comment: PropTypes.string,
      rating: PropTypes.number,
    }),
  ]),
};
export default FeedbackModel;
