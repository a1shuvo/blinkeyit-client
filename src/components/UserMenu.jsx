import toast from "react-hot-toast";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import Divider from "./Divider";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.mobile}{" "}
        </span>
        <Link className="hover:text-primary-200" to={"/dashboard/profile"}>
          <HiOutlineExternalLink size={15} />
        </Link>{" "}
      </div>
      <Divider />
      <div className="text-sm grid gap-1">
        <Link
          to={"/dashboard/my-orders"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          My Orders
        </Link>
        <Link
          to={"/dashboard/address"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-orange-200 py-1 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
