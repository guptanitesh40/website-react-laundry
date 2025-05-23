import "./login.css";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/login/useLogin";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";
import { setAuthStatus } from "../../redux/slices/authSlice";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from || "/";

  const { login, loading } = useLogin();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [formdata, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const formValidation = Yup.object().shape({
    username: Yup.string()
      .min(10, "Username must be at least 10 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await formValidation.validate(formdata, { abortEarly: false });
      setErrors("");
      const result = await login(formdata.username, formdata.password);
      if (result) {
        dispatch(addUser(result.user));
        dispatch(setAuthStatus(!!result.token));
        navigate(from, { replace: true });
      }
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <section className="grid place-items-center p-6 min-h-screen w-fill overflow-auto  mb-l:p-4">
      <form className="login-form-container">
        <div className="flex flex-col justify-center items-center gap-8 laptop-l:gap-6 mb:gap-4">
          <img
            src="sc-logo.png"
            alt="Sikka Cleaner Logo"
            loading="lazy"
            className="h-16 w-auto laptop-l:h-14 mb:h-12"
          />
          <h2 className="text-[2.4rem] leading-[1.5] font-bold text-[var(--black)] laptop-l:text-[2rem] mb:text-[1.8rem]">
            Login in to your account
          </h2>
        </div>

        <div
          className={`flex flex-col ${
            errors.username || errors.password ? "gap-6" : "gap-10 mb:gap-8"
          }`}
        >
          <div>
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="mt-4">
              <input
                id="username"
                name="username"
                placeholder="Email or mobile number"
                className="form-input"
                value={formdata.username}
                onChange={handleChange}
              />
            </div>
            {errors.username && (
              <p className="error-label">{errors.username}</p>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div>
                <Link
                  to="/forget-password"
                  className="forget-link"
                  aria-label="Forget password"
                  title="Forget password"
                >
                  Forgot password ?
                </Link>
              </div>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="form-input"
                value={formdata.password}
                onChange={handleChange}
              />
              <span
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer h-12 w-12 flex justify-center items-center rounded-full hover:bg-gray-100"
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
              <p className="error-label">{errors.password}</p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="login-btn"
            title="login"
            aria-label="login"
            onClick={(e) => handleSubmit(e)}
            disabled={loading}
          >
            {loading ? (
              <div className="login-animation">
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
        <p className="text-center text-xl text-[#83848a]">
          Don&apos;t have any account ?
          <Link
            to="/signup"
            className="ml-4 text-[#818cf8]"
            aria-label="register now"
            title="register"
          >
            Register
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
