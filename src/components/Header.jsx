import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import Search from "./Search";

const Header = () => {
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1">
      <div className="container mx-auto flex items-center justify-between px-2">
        {/* Logo */}
        <div>
          <Link to={"/"}>
            <img
              src={logo}
              width={170}
              height={60}
              alt="Blinkeyit Logo"
              className="hidden lg:block"
            />
            <img
              src={logo}
              width={120}
              height={60}
              alt="Blinkeyit Logo"
              className="lg:hidden"
            />
          </Link>
        </div>

        {/* Search */}
        <div className="hidden lg:block">
          <Search />
        </div>

        {/* Login & My Cart */}
        <div>
          <button className="text-neutral-600 lg:hidden">
            <FaRegUserCircle size={25} />
          </button>
          <div className="hidden lg:block">Login & My Cart</div>
        </div>
      </div>
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
