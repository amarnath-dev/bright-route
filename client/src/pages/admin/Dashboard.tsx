import { AdminSidebar } from "../../componets/adminsidebar/AdminSidebar";

export const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="grid col-span-3">
          <AdminSidebar />
        </div>
        <div className="bg-red-200 grid h-screen col-span-9 justify-center">
          <h1 className="text-2xl mt-20">ADMIN DASH BOARD</h1>
        </div>
      </div>
    </>
  );
};
