import { FaUserTie } from "react-icons/fa";

export const AdminSidebar = () => {
  return (
    <>
      <div className="w-72 h-screen shadow-lg rounded-lg bg-slate-200 fixed">
        <div className="text-center mt-10 font-bold text-gray-700">
          <h1>Bright Route Admin Panel</h1>
        </div>

        <div className="flex justify-start items-start flex-col mx-3 my-3">
          <button className="flex items-center px-4 py-2 rounded-md w-full mt-8 bg-color-two">
            <FaUserTie className="text-gray-500" />
            <span className="ml-4 font-bold text-gray-500">
              Mentor Application
            </span>
          </button>

          <button className="flex items-center px-4 py-2 rounded-md w-full mt-8">
            <FaUserTie className="text-gray-500" />
            <span className="ml-4 font-bold text-gray-500">
              Mentor Application
            </span>
          </button>

          <button className="flex items-center px-4 py-2 rounded-md w-full mt-8">
            <FaUserTie className="text-gray-500" />
            <span className="ml-4 font-bold text-gray-500">
              Mentor Application
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
