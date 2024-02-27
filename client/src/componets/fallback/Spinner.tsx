import { SyncLoader } from "react-spinners";
const Spinner = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <SyncLoader size={10} className="text-blue-500" />
      </div>
    </>
  );
};

export default Spinner;
