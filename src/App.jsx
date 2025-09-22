import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { setUserDetails } from "./store/userSlice";
import fetchUserDetails from "./utils/fetchUserDetails";

function App() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-170px)]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
