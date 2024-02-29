import { useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useAppSelector((state) => state.userAuth);
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-96 bg-slate-900 shadow-2xl">
        <div className="h-96 flex justify-center items-center flex-col">
          <h1 className="font-bold text-4xl ml-5 text-gray-200">
            Welcome, {user?.first_name}
          </h1>
          <h3 className="mt-5 font-bold text-xl ml-5 text-gray-200">
            Start connecting with mentors and get ready to take your career to
            the next level!
          </h3>
          <div>
            <button
              className="underline hover:text-blue-500 mt-5 py-2 px-3 rounded-lg text-gray-200 font-medium"
              onClick={() => {
                navigate("/mentor/browse");
              }}
            >
              Browse Mentors
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
