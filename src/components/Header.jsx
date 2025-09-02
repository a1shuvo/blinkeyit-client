import { Link } from "react-router";
import logo from "../assets/logo.png";
import Search from "./Search";

const Header = () => {
  return (
    <header className="h-20 shadow-md sticky top-0">
      <div className="container mx-auto flex items-center justify-between h-full px-2">
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
        <div>
          <Search />
        </div>

        {/* Login & My Cart */}
        <div>Login & My Cart</div>
      </div>
    </header>
  );
};

export default Header;
