import { BsCart4 } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import useMobile from "../hooks/useMobile";
import Search from "./Search";

const Header = () => {
  const isMobile = useMobile();
  const location = useLocation();
  const isSearchPage = location?.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  console.log("store", user);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
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
            {/* Display icon in mobile devices */}
            <button className="text-neutral-600 lg:hidden">
              <FaRegUserCircle size={25} />
            </button>
            {/* For Desktop */}
            <div className="hidden lg:flex items-center gap-10">
              <button
                onClick={redirectToLoginPage}
                className="text-lg px-2 cursor-pointer"
              >
                Login
              </button>
              <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 p-3 rounded text-white cursor-pointer">
                {/* Add to cart icon */}
                <div className="animate-bounce">
                  <BsCart4 size={26} />
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
