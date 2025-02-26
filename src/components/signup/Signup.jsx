import "./signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useSignup from "../../hooks/signup/useSignup";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import useGenerateOtp from "../../hooks/signup/useGenerateOtp";
import { addUser } from "../../redux/slices/userSlice";
import { setAuthStatus } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signup, loading } = useSignup();
  const { generateOtp } = useGenerateOtp();
  const [mvalidation, setMvalidation] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    password: "",
    gender: "",
    role_id: "5",
    email: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signUpSchema = Yup.object().shape({
    first_name: Yup.string().required("first name is required"),
    last_name: Yup.string().required("lastname is required"),
    mobile_number: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    gender: Yup.string().required("Please select you gender"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    otp: Yup.string()
      .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
      .required("OTP is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUpSchema.validate(formData, { abortEarly: false });
      const result = await signup(formData);
      if (result) {
        dispatch(addUser(result.user));
        dispatch(setAuthStatus(!!result.token));
        navigate("/");
      }
      setErrors("");
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  const sendOtp = () => {
    const mobile = formData.mobile_number;
    const isValid = /^[0-9]{10}$/.test(mobile);
    if (!mobile) {
      setMvalidation("Mobile number is required");
    } else if (!isValid) {
      setMvalidation("Mobile number must be 10 digits");
    } else {
      setMvalidation("");
      generateOtp(mobile);
    }
  };

  return (
    <section className="grid place-items-center p-6 min-h-screen w-full overflow-auto tab:p-8 mb-l:p-6 mb:p-4">
      <div className="signup-form-container">
        <div className="flex flex-col justify-center items-center gap-6 laptop-l:gap-4">
          <img
            src="sc-logo.png"
            alt="Sikka Cleaner Logo"
            loading="lazy"
            className="h-16 w-auto laptop-l:h-14 mb:h-12"
          />
          <h2 className="text-[2.4rem] leading-[1.5] font-bold text-[var(--black)] laptop-l:text-[2rem] mb:text-[1.8rem]">
            Create an account
          </h2>
        </div>
        <div>
          <form
            className={`grid grid-cols-2 gap-12 tab-s:gap-10 tab:grid-cols-1 tab:gap-8`}
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="first_name" className="signup-label">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First name"
                value={formData.first_name}
                onChange={handleChange}
                className="signup-input"
              />
              {errors.first_name && (
                <p className="signup-error-label">{errors.first_name}</p>
              )}
            </div>

            <div>
              <label htmlFor="last_name" className="signup-label">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="last name"
                value={formData.last_name}
                onChange={handleChange}
                className="signup-input"
              />
              {errors.last_name && (
                <p className="signup-error-label">{errors.last_name}</p>
              )}
            </div>

            <div>
              <label htmlFor="mobile" className="signup-label">
                Mobile Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="mobile"
                  name="mobile_number"
                  placeholder="99099XXXXX"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  className="signup-input"
                ></input>
                <button type="button" className="send-otp-btn" onClick={sendOtp}>
                  send
                </button>
              </div>
              {(mvalidation && (
                <p className="signup-error-label">{mvalidation}</p>
              )) ||
                (errors.mobile_number && (
                  <p className="signup-error-label">{errors.mobile_number}</p>
                ))}
            </div>

            <div>
              <label htmlFor="otp" className="signup-label">
                Otp
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="otp"
                value={formData.otp}
                onChange={handleChange}
                className="signup-input"
              />
              {errors.otp && <p className="signup-error-label">{errors.otp}</p>}
            </div>

            <div>
              <label htmlFor="email" className="signup-label">
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="user@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="signup-input"
              />
              {errors.email && (
                <p className="signup-error-label">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="signup-label">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="signup-input"
                />
                <span
                  className="absolute cursor-pointer top-1/2 right-4 -translate-y-1/2 h-12 w-12 flex justify-center items-center rounded-full hover:bg-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoMdEyeOff className="h-8 w-8 fill-[#83848a]" />
                  ) : (
                    <IoMdEye className="h-8 w-8 fill-[#83848a]" />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="signup-error-label">{errors.password}</p>
              )}
            </div>

            <div className="col-span-2 tab:col-span-1">
              <label className="signup-label">Gender</label>
              <div className="flex items-center gap-4 mt-2 mb:max-w-full mb:overflow-x-auto">
                <label
                  htmlFor="male"
                  className="inline-flex justify-center items-center gap-6 text-[1.3rem] font-normal leading-[1.5] border-[0.5px] border-[#83848a] px-6 py-4 rounded-lg mb-l:px-4 mb-l:gap-4 mb:rounded-[0.25rem]"
                >
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="1"
                    onChange={handleChange}
                    className="gender-radio-btn"
                  />
                  <span>Male</span>
                </label>

                <label
                  htmlFor="female"
                  className="inline-flex justify-center items-center gap-6 text-[1.3rem] font-normal leading-[1.5] border-[0.5px] border-[#83848a] px-6 py-4 rounded-lg mb-l:px-4 mb-l:gap-4 mb:rounded-[0.25rem]"
                >
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="2"
                    onChange={handleChange}
                    className="gender-radio-btn"
                  />
                  <span>Female</span>
                </label>

                <label
                  htmlFor="others"
                  className="inline-flex justify-center items-center gap-6 text-[1.3rem] font-normal leading-[1.5] border-[0.5px] border-[#83848a] px-6 py-4 rounded-lg mb-l:px-4 mb-l:gap-4 mb:rounded-[0.25rem]"
                >
                  <input
                    type="radio"
                    name="gender"
                    id="others"
                    value="3"
                    className="gender-radio-btn"
                    onChange={handleChange}
                  />
                  <span>Other</span>
                </label>
              </div>
              {errors.gender && (
                <p className="signup-error-label">{errors.gender}</p>
              )}
            </div>

            <button
              type="submit"
              className="col-span-2 w-[40%] justify-self-center signup-button tab:col-span-1 tab:max-w-[20rem] tab:w-full mb:min-w-full"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-10 text-center text-xl text-[#83848a] tab:mt-8">
            Alredy have an account ?
            <Link
              to="/login"
              aria-label="register now"
              title="login now"
              className="ml-4 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
