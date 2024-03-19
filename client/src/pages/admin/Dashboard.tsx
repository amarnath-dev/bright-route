import { AdminSidebar } from "../../componets/adminsidebar/AdminSidebar";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-12 bg-background-two">
        <div className="grid col-span-3">
          <AdminSidebar />
        </div>
        <div className="grid h-screen col-span-9 justify-center">
          <h1 className="text-2xl mt-20 text-gray-400">ADMIN DASH BOARD</h1>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
