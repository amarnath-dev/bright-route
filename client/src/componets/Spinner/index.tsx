import { HashLoader } from "react-spinners";
const Spinner = () => {
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-background-two">
        <HashLoader color="#36d7b7" />
      </div>
    </>
  );
};

export default Spinner;
