import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const PageNotFound = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userAuth);

  const handleNavigate = () => {
    if (user?.role === "mentee") {
      console.log("Navigating to /");
      navigate("/");
    }
    if (user?.role === "mentor") {
      console.log("Navigating to /mentor/home");
      navigate("/mentor/home");
    }
    if (user?.role === "admin") {
      console.log("Navigating to /admin/dashboard");
      navigate("/admin/dashboard");
    }
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center flex-col bg-background-two">
        <h1 className="text-2xl font-bold text-white">
          Ooops...Looks like you need direction👾
        </h1>
        <img
          className="h-40 mt-3"
          src="https://assets-v2.lottiefiles.com/a/3455ed68-1151-11ee-9772-5b4c76d6674b/10CiT9v5M8.gif"
          alt="page_not_found"
        />
        <button
          className="px-4 mt-1 bg-color-five py-1 border rounded"
          onClick={handleNavigate}
        >
          Home
        </button>
      </div>
    </>
  );
};

export default PageNotFound;
