import { createBrowserRouter } from "react-router";
import App from "../App";
import Dashboard from "../layouts/Dashboard";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyOrders from "../pages/MyOrders";
import OtpVerification from "../pages/OtpVerification";
import ProductAdmin from "../pages/ProductAdmin";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import SearchPage from "../pages/SearchPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import UserMenuMobile from "../pages/UserMenuMobile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verification-otp",
        element: <OtpVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "my-orders",
            element: <MyOrders />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "category",
            element: <CategoryPage />,
          },
          {
            path: "subcategory",
            element: <SubCategoryPage />,
          },
          {
            path: "upload-product",
            element: <UploadProduct />,
          },
          {
            path: "product",
            element: <ProductAdmin />,
          },
        ],
      },
    ],
  },
]);

export default router;
