import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state?.user);
  console.log("profile", user);

  return (
    <div>
      <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full" />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
      <button className="text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 mt-3 rounded-full cursor-pointer">
        Edit
      </button>
    </div>
  );
};

export default Profile;
