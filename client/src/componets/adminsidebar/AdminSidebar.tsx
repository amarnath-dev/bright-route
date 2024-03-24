import { FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaWpforms } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const AdminSidebar = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const logOut = () => {
    Swal.fire({
      title: "Confirm Log Out",
      text: "Proceed with Log Out ?",
      showCancelButton: true,
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPrivate.delete("/logout", {
            withCredentials: true,
          });
          if (response.data.status === "success") {
            Cookies.remove("accessToken");
            navigate("/signin");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  return (
    <>
      <div className="w-72 h-screen shadow-lg rounded-lg fixed bg-gray-800">
        <div className="text-center mt-10 font-bold text-gray-700">
          <h1 className="text-gray-400">Bright Route Admin Panel</h1>
        </div>
        <div className="flex justify-start items-start flex-col mx-3 my-3">
          <button className="flex items-center px-4 py-2 rounded-md w-full mt-8 hover:bg-gray-700">
            <RxDashboard className="text-color-five text-xl" />
            <Link
              className="ml-4 font-bold text-gray-400"
              to={"/admin/dashboard"}
            >
              Dash Board
            </Link>
          </button>
          <button className="flex items-center px-4 py-2 rounded-md w-full mt-8 hover:bg-gray-700">
            <FaWpforms className="text-color-five text-xl" />
            <Link
              className="ml-4 font-bold text-gray-400"
              to={"/admin/mentor-application"}
            >
              Mentor Application
            </Link>
          </button>
          <button className="flex items-center px-4 py-2 rounded-md w-full mt-8 hover:bg-gray-700">
            <FaPeopleGroup className="text-color-five text-xl" />
            <Link
              className="ml-4 font-bold text-gray-400"
              to={"/admin/mentee-management"}
            >
              Mentee Managment
            </Link>
          </button>
          <button className="flex items-center px-4 py-2 rounded-md w-full mt-8 hover:bg-gray-700">
            <FaUserGroup className="text-color-five text-xl" />
            <Link
              className="ml-4 font-bold text-gray-400"
              to={"/admin/mentor-management"}
            >
              Mentor Managment
            </Link>
          </button>
          <button
            className="flex items-center px-4 py-2 rounded-md w-full mt-8 hover:bg-gray-700"
            onClick={logOut}
          >
            <LuLogOut className="text-red-500 text-xl" />
            <span className="ml-4 font-bold text-gray-400">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};
