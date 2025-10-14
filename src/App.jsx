import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import "./App.css";
import SummaryApi from "./common/SummaryApi";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { setAllCategory } from "./store/productSlice";
import { setUserDetails } from "./store/userSlice";
import Axios from "./utils/Axios";
import AxiosToastError from "./utils/AxiosToastError";
import fetchUserDetails from "./utils/fetchUserDetails";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserDetails();
        if (userData?.data) {
          dispatch(setUserDetails(userData.data));
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        // Optional: redirect to login or show toast
      }
    };

    const fetchCategory = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.get_category,
        });
        const { data: responseData } = response;
        if (responseData?.success) {
          dispatch(setAllCategory(responseData?.data));
          // setCategoryData(responseData?.data);
        }
      } catch (error) {
        AxiosToastError(error);
      }
    };

    fetchUser();
    fetchCategory();
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-170px)]">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
