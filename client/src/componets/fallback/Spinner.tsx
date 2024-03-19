import { HashLoader } from "react-spinners";
const Spinner = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {/* <SyncLoader size={15} className="text-blue-500" /> */}
        <HashLoader color="#36d7b7" />
      </div>
    </>
  );
};

export default Spinner;
