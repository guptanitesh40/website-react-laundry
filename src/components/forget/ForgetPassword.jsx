import "./forget.css";
import { useNavigate } from "react-router-dom";
import useGenerateOtp from "../../hooks/otp/useGenerateOtp";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const ForgetPassword = () => {
  const { generateOtp, loading } = useGenerateOtp();
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState(null);
  const [error, setErrors] = useState("");

  const handleCancle = () => {
    navigate("/login");
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length !== 10) {
      setErrors("Please enter a valid 10-digit mobile number.");
      return;
    }

    setErrors("");

    const result = await generateOtp(mobileNumber);
    if (result.success) {
      navigate("/enter-otp", { state: { mobileNumber } });
    }
  };

  return (
    <section className="bg-white grid place-items-center p-6 min-h-screen w-full overflow-auto tab:p-8 mb-l:p-6 mb:p-4">
      <div className="forget-pass-container">
        <h2 className="text-center text-[2.4rem] leading-[1.5] font-bold text-[var(--black)] laptop-l:text-[2rem] mb:text-[1.8rem]">
          Find your account
        </h2>

        <form className="flex flex-col gap-8" onSubmit={handleSendOtp}>
          <div>
            <label htmlFor="country" className="forget-label">
              country
            </label>
            <div className="relative">
              <select
                name="country"
                id="country"
                className="forget-input country-dd"
              >
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="australia">Australia</option>
              </select>
              <FaCaretDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="mobile_number" className="forget-label">
              mobile number
            </label>
            <div>
              <input
                id="mobile_number"
                type="text"
                className="forget-input"
                placeholder="Enter mobile number"
                value={mobileNumber || ""}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              {error && <p className="forget-error-label">{error}</p>}
            </div>
          </div>

          <div className="flex justify-between items-center gap-8 mt-4 mb-l:gap-4 mb:flex-wrap">
            <button type="button" className="cancel-btn" onClick={handleCancle}>
              cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "send otp"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
