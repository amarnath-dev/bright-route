import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../componets/navbar/Navbar";

const MentorHome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-screen bg-slate-400">
        <NavBar />
        <div className="w-full md:w-full h-16 bg-slate-900 text-white flex items-center justify-around"></div>
        <div className="w-full h-80 bg-slate-900 flex justify-start">
          <div className="ml-3 md:ml-10">
            <h1 className="uppercase text-white text-5xl mt-10">welcome,</h1>
            <h1 className="text-white mt-3 md:text-xl">
              Share your'e knowledge, Grow yourself
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Google_Bard_logo.svg"
                alt="logo"
                className="w-12 h-12 mt-3"
              />
            </h1>
            <div className="mt-4">
              <button
                type="button"
                className="text-white bg-gradient-to-r bg-color-five w-40 md:w-52 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => {
                  navigate("/mentor/profile");
                }}
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorHome;
