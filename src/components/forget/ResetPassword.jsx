import "./forget.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import useResetPassword from "../../hooks/otp/useResetPassword";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPassword, loading } = useResetPassword();
  const location = useLocation();
  const mobileNumber = location?.state?.mobile_number;
  const otp = location?.state?.otp;
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState(false);

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confPassword: false,
  });

  const [formData, setFormData] = useState({
    newPassword: "",
    confPassword: "",
  });

  const handleCancelClick = async () => {
    navigate("/login");
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setIsError(false);
      setErrors({});
      const result = await resetPassword(
        mobileNumber,
        otp,
        formData.confPassword
      );
      if (result.success) {
        navigate("/login");
      }
    } catch (error) {
      setIsError(true);
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .min(6, "Password must be 6 character long")
      .required("new password is required"),
    confPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirmation password is required"),
  });

  useEffect(() => {
    if (!location.state) {
      navigate("/login");
    }
  }, [location.state, navigate]);

  return (
    <section className="bg-white grid place-items-center p-6 min-h-screen w-full overflow-auto tab:p-8 mb-l:p-6 mb:p-4">
      <form
        className={`reset-password-container flex flex-col ${
          isError ? "gap-6" : "gap-10"
        }`}
      >
        <h2 className="capitalize text-center text-[2.4rem] leading-[1.5] font-bold text-[var(--black)] laptop-l:text-[2rem] mb-l:text-[1.8rem]">
          Reset Password
        </h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="new_password" className="forget-label !m-0">
            New password
          </label>
          <div className="relative">
            <input
              id="new_password"
              type={showPassword.newPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New password"
              className="forget-input"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <span
              className="absolute cursor-pointer top-1/2 right-4 -translate-y-1/2 h-12 w-12 flex justify-center items-center rounded-full hover:bg-gray-100"
              onClick={() => togglePassword("newPassword")}
            >
              {showPassword.newPassword ? (
                <IoMdEyeOff className="h-8 w-8 fill-[#83848a]" />
              ) : (
                <IoMdEye className="h-8 w-8 fill-[#83848a]" />
              )}
            </span>
          </div>

          {errors.newPassword && (
            <span className="forget-error-label !p-0">
              {errors.newPassword}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="conf_password" className="forget-label">
            Confirm password
          </label>
          <div className="relative">
            <input
              name="confPassword"
              id="conf_password"
              type={showPassword.confPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="forget-input"
              value={formData.confPassword}
              onChange={handleChange}
            />
            <span
              className="absolute cursor-pointer top-1/2 right-4 -translate-y-1/2 h-12 w-12 flex justify-center items-center rounded-full hover:bg-gray-100"
              onClick={() => togglePassword("confPassword")}
            >
              {showPassword.confPassword ? (
                <IoMdEyeOff className="h-8 w-8 fill-[#83848a]" />
              ) : (
                <IoMdEye className="h-8 w-8 fill-[#83848a]" />
              )}
            </span>
          </div>

          {errors.confPassword && (
            <span className="forget-error-label !p-0">
              {errors.confPassword}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center py-2">
          <button
            type="button"
            className="cancel-btn"
            onClick={handleCancelClick}
          >
            cancel
          </button>
          <button
            type="button"
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "loading..." : "submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;
