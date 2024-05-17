import { useEffect, useState } from "react";
import { AdminSidebar } from "../../componets/AdminSidebar";
import Chart from "../../componets/Chart";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Dashboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [analytics, setAnalytics] = useState({
    mentees: 0,
    mentors: 0,
  });
  useEffect(() => {
    (async () => {
      const response = await axiosPrivate.get("admin/analytics", {
        withCredentials: true,
      });
      if (response.data) {
        setAnalytics(response.data);
      }
    })();
  }, [axiosPrivate]);
  return (
    <>
      <div className="grid grid-cols-12 bg-background-two">
        <div className="grid col-span-3 h-full bg-background-two">
          <AdminSidebar />
        </div>
        <div className="grid h-screen col-span-9">
          <div className="w-full flex justify-around h-1/2 py-10">
            <figure className="md:w-80 h-32 rounded-xl py-5 shadow-lg bg-gray-900">
              <div className="">
                <div className="font-bold text-center">
                  <h1 className="text-white text-xl">Total Mentors</h1>
                  <h1 className="mt-2 uppercase text-color-five text-3xl">
                    {analytics?.mentors}
                  </h1>
                </div>
              </div>
            </figure>
            <figure className="md:w-80 h-32 rounded-xl py-5 shadow-lg bg-gray-900">
              <div className="">
                <div className="font-bold text-center">
                  <h1 className="text-white text-xl">Total Mentees</h1>
                  <h1 className="mt-2 uppercase text-color-five text-3xl">
                    {analytics?.mentees}
                  </h1>
                </div>
              </div>
            </figure>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <Chart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
