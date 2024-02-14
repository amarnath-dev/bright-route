import { FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";

export const AdminSidebar = () => {
  return (
    <>
      <div className="w-72 h-screen shadow-lg rounded-lg bg-slate-200 fixed">
        <div className="text-center mt-10 font-bold text-gray-700">
          <h1>Bright Route Admin Panel</h1>
        </div>

        <div className="flex justify-start items-start flex-col mx-3 my-3">
          <button className="flex items-center px-4 py-2 rounded-md w-full mt-8">
            <FaUserTie className="text-gray-500" />
            <Link
              className="ml-4 font-bold text-gray-500"
              to={"/admin/dashboard"}
            >
              Dash Board
            </Link>
          </button>

          <button className="flex items-center px-4 py-2 rounded-md w-full mt-8">
            <FaUserTie className="text-gray-500" />
            <Link
              className="ml-4 font-bold text-gray-500"
              to={"/admin/mentor-application"}
            >
              Mentor Application
            </Link>
          </button>

          {/* <button className="flex items-center px-4 py-2 rounded-md w-full mt-8">
            <FaUserTie className="text-gray-500" />
            <Link
              className="ml-4 font-bold text-gray-500"
              to={"/admin/skill-managment"}
            >
              Skill Managment
            </Link>
          </button> */}
        </div>
      </div>
    </>
  );
};
