import { lazy, Suspense } from "react";
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
import Signup from "./components/signup/Signup";
import Login from "./components/Login/Login";
import EnterOtp from "./components/forget/EnterOtp";
import ForgetPassword from "./components/forget/ForgetPassword";
import ResetPassword from "./components/forget/ResetPassword";
const Services = lazy(() => import("./components/services/Services"));
const CorporateServices = lazy(() =>
  import("./components/corporate_services/CorporateServices")
);
const Prices = lazy(() => import("./components/prices/Prices"));
const About = lazy(() => import("./components/about/About"));
const Contact = lazy(() => import("./components/contact/Contact"));
const Cart = lazy(() => import("./components/cart/Cart"));
const QuickOrderCart = lazy(() => import("./components/cart/QuickOrderCart"));
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
import ScrollToTop from "./components/scroll/ScrollToTop";
import useFetchSettings from "./hooks/settings/useFetchSettings";
import useFetchCart from "./hooks/newCart/useFetchCart";

const App = () => {
  return (
    <Router>
      <Toaster
        toastOptions={{
          style: {
            fontWeight: 400,
            maxWidth: "400px",
          },
          className: "toast",
          duration: 2000,
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
                <ForgetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/enter-otp"
            element={
              <PublicRoute>
                <EnterOtp />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

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
            path="/pickup-clothes"
            element={
              <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                  <QuickOrderCart />
                </Suspense>
              </ProtectedRoute>
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
