import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
const Signup = lazy(() => import("./components/signup/Signup"));
const Login = lazy(() => import("./components/Login/Login"));
const EnterOtp = lazy(() => import("./components/forget/EnterOtp"));
const ForgetPassword = lazy(() => import("./components/forget/ForgetPassword"));
const ResetPassword = lazy(() => import("./components/forget/ResetPassword"));
const Services = lazy(() => import("./components/services/Services"));
const CorporateServices = lazy(() =>
  import("./components/corporate_services/CorporateServices")
);
const Prices = lazy(() => import("./components/prices/Prices"));
const About = lazy(() => import("./components/about/About"));
const Contact = lazy(() => import("./components/contact/Contact"));
const More = lazy(() => import("./components/more/More"));
const Cart = lazy(() => import("./components/cart/Cart"));
const Order = lazy(() => import("./components/order/Order"));
const DashBoard = lazy(() => import("./components/dashboard/DashBoard"));
const DashBoardHome = lazy(() => import("./components/dashboard/Home"));
const Profile = lazy(() => import("./components/dashboard/Profile"));
const PriceListView = lazy(() =>
  import("./components/dashboard/PriceListView")
);
const RefundPolicy = lazy(() =>
  import("./components/refund-policy/RefundPolicy")
);
const Faq = lazy(() => import("./components/faq/Faq"));
const WriteReview = lazy(() => import("./components/dashboard/WriteReview"));
const SavedAddress = lazy(() => import("./components/dashboard/SavedAddress"));
const ViewOrder = lazy(() => import("./components/dashboard/ViewOrder"));
const TermsCondition = lazy(() => import("./components/t&c/TermsCondition"));
const PrivacyPolicy = lazy(() =>
  import("./components/privacy-policy/PrivacyPolicy")
);
import ProtectedRoute from "./components/protected/ProtectedRoute";
import PublicRoute from "./components/protected/PublicRoute";
import NotFound from "./components/NotFound";
import Loading from "./components/loading/Loading";
import useValidateToken from "./hooks/token/useValidateToken";
import Admin from "./components/admin/Admin";
import ScrollToTop from "./components/scroll/ScrollToTop";
import useFetchSettings from "./hooks/settings/useFetchSettings";
import useFetchCart from "./hooks/newCart/useFetchCart";

const App = () => {
  return (
    <Router>
      <Toaster
        toastOptions={{
          className: "toast",
          style: {
            fontSize: "16px",
            borderRadius: "10px",
            fontWeight: "500",
            maxWidth: "500px",
          },
          duration: 100000,
        }}
      />
      <ScrollToTop />
      <MainComponent />
    </Router>
  );
};

const MainComponent = () => {
  const location = useLocation();
  const { loading: loadingUserValidation } = useValidateToken();
  const { loading: loadingFetchCart } = useFetchCart();
  const { loading: loadingSettings } = useFetchSettings();

  const isLoading =
    loadingSettings || loadingFetchCart || loadingUserValidation;

  if (isLoading) {
    return <Loading />;
  }

  const excludeHeaderFooterRoutes = [
    "/login",
    "/signup",
    "/forget-password",
    "/enter-otp",
    "/reset-password",
    "/dashboard",
  ];

  const isExcludedRoute =
    excludeHeaderFooterRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isExcludedRoute && <Header />}
      <main>
        <Routes>
          <Route
            path="/forget-password"
            element={
              <PublicRoute>
                <Suspense fallback={<Loading />}>
                  <ForgetPassword />
                </Suspense>
              </PublicRoute>
            }
          />
          <Route
            path="/enter-otp"
            element={
              <PublicRoute>
                <Suspense fallback={<Loading />}>
                  <EnterOtp />
                </Suspense>
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <Suspense fallback={<Loading />}>
                  <ResetPassword />
                </Suspense>
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Suspense fallback={<Loading />}>
                  <Signup />
                </Suspense>
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Suspense fallback={<Loading />}>
                  <Login />
                </Suspense>
              </PublicRoute>
            }
          />

          <Route path="/admin" element={<Admin />} />

          <Route
            path="/terms-condition"
            element={
              <Suspense fallback={<Loading />}>
                <TermsCondition />
              </Suspense>
            }
          />

          <Route
            path="privacy-policy"
            element={
              <Suspense fallback={<Loading />}>
                <PrivacyPolicy />
              </Suspense>
            }
          />

          <Route
            path="/refund-policy"
            element={
              <Suspense fallback={<Loading />}>
                <RefundPolicy />
              </Suspense>
            }
          />

          <Route
            path="faq"
            element={
              <Suspense fallback={<Loading />}>
                <Faq />
              </Suspense>
            }
          />

          <Route path="/" element={<Home />} />

          <Route
            path="/about"
            element={
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<Loading />}>
                <Contact />
              </Suspense>
            }
          />
          <Route
            path="/prices"
            element={
              <Suspense fallback={<Loading />}>
                <Prices />
              </Suspense>
            }
          />
          <Route
            path="/corporate-services"
            element={
              <Suspense fallback={<Loading />}>
                <CorporateServices />
              </Suspense>
            }
          />
          <Route
            path="/more"
            element={
              <Suspense fallback={<Loading />}>
                <More />
              </Suspense>
            }
          />
          <Route
            path="/services"
            element={
              <Suspense fallback={<Loading />}>
                <Services />
              </Suspense>
            }
          />
          <Route
            path="/order"
            element={
              <Suspense fallback={<Loading />}>
                <Order />
              </Suspense>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                  <Cart />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                  <DashBoard />
                </Suspense>
              </ProtectedRoute>
            }
          >
            <Route
              path="home"
              element={
                <Suspense fallback={<Loading />}>
                  <DashBoardHome />
                </Suspense>
              }
            />
            <Route
              path="profile"
              element={
                <Suspense fallback={<Loading />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="price-list"
              element={
                <Suspense fallback={<Loading />}>
                  <PriceListView />
                </Suspense>
              }
            />
            <Route
              path="write-review"
              element={
                <Suspense fallback={<Loading />}>
                  <WriteReview />
                </Suspense>
              }
            />
            <Route
              path="saved-addresses"
              element={
                <Suspense fallback={<Loading />}>
                  <SavedAddress />
                </Suspense>
              }
            />
            <Route
              path="view-order"
              element={
                <Suspense fallback={<Loading />}>
                  <ViewOrder />
                </Suspense>
              }
            />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      {!isExcludedRoute && <Footer />}
    </>
  );
};

export default App;
