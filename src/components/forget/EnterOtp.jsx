import "./enterotp.css";
import { useEffect, useRef, useState } from "react";
import useValidateOtp from "../../hooks/otp/useValidateOtp";
import { useLocation, useNavigate } from "react-router-dom";

const EnterOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mobile_number = location?.state?.mobileNumber;
  const last3 = String(mobile_number).slice(-3);
  const { validateOtp, loading } = useValidateOtp();
  const [error, setError] = useState();
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    if (e.target.value.length > 1) {
      e.target.value = e.target.value[0];
    }

    if (e.target.value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && e.target.value === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otp = inputRefs.current.map((input) => input.value).join("");
    if (!otp) {
      setError("please enter you otp");
      return;
    }

    if (otp.length !== 6) {
      setError("Otp must be 6 digits");
      return;
    }

    setError("");

    const result = await validateOtp(otp, mobile_number);
    if (result.success) {
      navigate("/reset-password", { state: { mobile_number, otp } });
    }
  };

  useEffect(() => {
    if (!location.state) {
      navigate("/login");
    }
  }, [location.state, navigate]);

  return (
    <section className="bg-white grid place-items-center p-6 min-h-screen w-full overflow-auto tab:p-8 mb-l:p-6 mb:p-4">
      <div className="enter-mobile-container">
        <h2 className="text-center text-[2.4rem] leading-[1.5] font-bold text-[var(--black)] mb-12 laptop-l:text-[2rem] mb-l:text-[1.8rem] mb-l:mb-8">
          Forget password
        </h2>

        <p className="text-2xl">Verify your phone number</p>
        <p className="verify-text2">We have send you an SMS with 6 digits</p>
        <div className="otp-boxes-container flex flex-col gap-6 mb-l:gap-4">
          <p className="text-[#83848a]">code sent to</p>
          <span className="font-bold text-center text-[var(--primary)]">
            +91 *****{last3}
          </span>
          <div className="boxes">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                className="box new-box text-[var(--primary)] focus:ring-2 focus:ring-indigo-600 mb-l:focus:ring-1"
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
        </div>
        {error && <p className="otp-error-label">{error}</p>}

        <div>
          <button
            className="new-verift-button"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "verifying..." : "verify"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default EnterOtp;
