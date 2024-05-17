import { useNavigate } from "react-router-dom";

const ProfileNav = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-14 bg-transparent flex bg-green-200 shadow-lg">
        <div className="flex-1"></div>
        <div className="flex justify-end items-center flex-2">
          <button
            className="mr-20 px-2 py-1 rounded-md font-bold"
            onClick={() => navigate("/mentor/my-mentees")}
          >
            My Mentee
          </button>
          <button
            className="mr-20 px-2 py-1 rounded-md font-bold"
            onClick={() => navigate("/mentor/plans")}
          >
            My Plans
          </button>
          <button
            className="mr-20 px-2 py-1 rounded-md font-bold"
            onClick={() => navigate("/mentor/managment/password")}
          >
            Password
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileNav;
