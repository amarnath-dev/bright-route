import { AdminSidebar } from "../../componets/AdminSidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { format } from "timeago.js";
import { MentorProfile } from "../../interfaces/admin.interface";

const MentorApplication = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<MentorProfile[]>();

  useEffect(() => {
    const applicationData = async () => {
      try {
        const response = await axiosPrivate.get("/admin/mentor-applications", {
          withCredentials: true,
        });
        if (response.data) {
          setApplications(response.data?.applications);
        }
      } catch (error) {
        console.log(error);
      }
    };
    applicationData();
  }, [axiosPrivate]);

  return (
    <>
      <div className="grid grid-cols-12 h-screen bg-background-two">
        <div className="hidden md:block col-span-3">
          <AdminSidebar />
        </div>
        <div className="col-span-12 md:col-span-9 h-screen px-2 py-2">
          <div className="mt-4">
            <div>
              <h1 className="font-bold text-gray-400">
                <span
                  onClick={() => navigate("/admin/dashboard")}
                  className="cursor-pointer"
                >
                  Dashboard
                </span>{" "}
                / <small>Mentor Applications</small>
              </h1>
            </div>
          </div>

          {applications && applications.length > 0 ? (
            <>
              <div className="relative overflow-x-auto py-10">
                <table className="w-full text-sm text-left rtl:text-right rounded">
                  <thead className="text-xs border border-gray-800 rounded-md">
                    <tr className="text-gray-400">
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Check
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications?.map(
                      (mentor: MentorProfile, index: number) => {
                        return (
                          <>
                            <tr
                              className="bg-gray-800 border-b text-gray-400"
                              key={index}
                            >
                              <th scope="row" className="px-6 py-4 font-medium">
                                {index + 1}
                              </th>
                              <td className="px-6 py-4">
                                {mentor?.first_name} {mentor?.last_name}
                              </td>
                              <td className="px-6 py-4">
                                {mentor?.mentorEmail}
                              </td>
                              <td className="px-6 py-4">
                                {format(mentor?.createdAt)}
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  className="py-1 px-5 rounded bg-color-five text-black"
                                  onClick={() =>
                                    navigate(
                                      `/admin/application-review/${mentor?._id}`
                                    )
                                  }
                                >
                                  Check
                                </button>
                              </td>
                            </tr>
                          </>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex w-full flex-col items-end">
                <div className="inline-flex mt-2 xs:mt-0">
                  <button className="flex items-center justify-center px-3 h-8 text-sm font-medium bg-color-one rounded text-white">
                    Prev
                  </button>
                  <button className="flex items-center justify-center px-3 h-8 text-sm font-medium bg-gray-200 hover:bg-gray-300 border-0 border-s rounded-e">
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-gray-400 text-2xl py-6">
                No Mentor Applications
              </h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MentorApplication;
