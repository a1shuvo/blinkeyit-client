import { Outlet } from "react-router";
import UserMenu from "../components/UserMenu";

const Dashboard = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 grid lg:grid-cols-[250px_1fr]">
        {/* Left Side for Menu */}
        <div className="py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r">
          <UserMenu />
        </div>
        {/* Right Side for Content */}
        <div className="bg-white min-h-[calc(100vh-170px)] p-2">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
