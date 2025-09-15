import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
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
