import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const PageNotFound = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userAuth);
  const handleNavigate = () => {
    if (user?.role === "mentee") {
      navigate("/");
    }
    if (user?.role === "mentor") {
      navigate("/mentor/home");
    }
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    }
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <h1>Ooops.... Looks like your lost👾</h1>
        <img
          className="h-40 mt-3"
          src="https://assets-v2.lottiefiles.com/a/3455ed68-1151-11ee-9772-5b4c76d6674b/10CiT9v5M8.gif"
          alt="page_not_found"
        />
        <button
          className="px-4 mt-1 hover:bg-gray-100 py-1 border-2 rounded"
          onClick={handleNavigate}
        >
          Home
        </button>
      </div>
    </>
  );
};

export default PageNotFound;
