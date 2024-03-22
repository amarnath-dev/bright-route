import { useEffect, useState } from "react";
import { AdminSidebar } from "../../componets/adminsidebar/AdminSidebar";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import CheckReport from "../../componets/checkReport/CheckReport";
import { toast } from "react-toastify";

//Mentor Types for state
interface ReportDetails {
  issue_faced: string;
  issue_desc: string;
  report_date: string;
  _id: string;
}

interface MentorReport {
  _id: string;
  mentor_id: string;
  mentee_id: string;
  ReportDetails: ReportDetails[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface MentorProfile {
  _id: string;
  mentor_id: string;
  profile_img: string;
  first_name: string;
  last_name: string;
  job_title: string;
  company: string;
  state: string;
  category: string;
  bio: string;
  linkedIn: string;
  twitter: string;
  web_url: string;
  why_mentor: string;
  achievement: string;
  profile_state: string;
  skills: string[];
  reports: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  isPaymentDetails: boolean;
}

interface MentorData {
  _id: string;
  email: string;
  password: string;
  role: string;
  is_blocked: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profileDetails: MentorProfile;
  mentorReports: MentorReport[];
}

const MentorManagement = () => {
  const [mentor, setMentor] = useState<MentorData[]>([]);
  const [userReport, setUserReport] = useState<ReportDetails[] | undefined>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axiosPrivate.get("/admin/mentor", {
          withCredentials: true,
        });
        if (response.data) {
          console.log("Mentor Details", response.data.mentors);
          setMentor(response.data?.mentors);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMentors();
  }, [axiosPrivate]);

  const handleClick = async (mentorId: string, type: string) => {
    try {
      if (type === "block") {
        const response = await axiosPrivate.patch(
          `/admin/block/${mentorId}`,
          {},
          { withCredentials: true }
        );
        if (response.data.status === "success") {
          const updatedUsers = mentor.map((user: MentorData) => {
            if (user?._id === mentorId) {
              return { ...user, is_blocked: true };
            }
            return user;
          });
          setMentor(updatedUsers);
          toast.success(response.data.message);
        }
      } else {
        const response = await axiosPrivate.patch(
          `/admin/unblock/${mentorId}`,
          {},
          { withCredentials: true }
        );
        if (response.data.status === "success") {
          const updatedUsers = mentor.map((user) => {
            if (user?._id === mentorId) {
              return { ...user, is_blocked: false };
            }
            return user;
          });
          setMentor(updatedUsers);
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModal = (userId: string) => {
    const user = mentor.find((user) => {
      return user._id === userId;
    });
    setUserReport(user?.mentorReports[0]?.ReportDetails);
    setOpenModal(true);
  };
  return (
    <>
      <CheckReport
        openModal={openModal}
        setOpenModal={setOpenModal}
        userReport={userReport}
      />
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
                / <small>Mentor Management</small>
              </h1>
            </div>
          </div>

          <div className="mt-5 mb-2 w-full">
            <div>
              <input
                type="text"
                id="simple-search"
                // value={search}
                // onChange={handleChange}
                className="border-gray-500 text-sm rounded block ps-5 p-2.5 bg-gray-800 text-gray-400"
                placeholder="Search Users..."
              />
            </div>
          </div>

          {mentor?.length > 0 ? (
            <>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right rounded">
                  <thead className="text-xs border border-gray-800 rounded-md">
                    <tr className="text-gray-400">
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Reports
                      </th>
                      <th scope="col" className="px-6 py-3">
                        View
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Block/Unblock
                      </th>
                    </tr>
                  </thead>

                  {mentor?.map((mentor, index: number) => {
                    return (
                      <>
                        <tbody key={index}>
                          <tr className="bg-gray-800 border-b text-gray-400">
                            <th scope="row" className="px-6 py-4 font-medium">
                              {mentor.profileDetails?.first_name}{" "}
                              {mentor.profileDetails?.last_name}
                            </th>
                            <td className="px-6 py-4">{mentor?.email}</td>
                            <td className="px-6 py-4">
                              {mentor?.mentorReports[0]?.ReportDetails.length}
                            </td>
                            <td className="px-6 py-4">
                              <button
                                className="border border-gray-600 bg-gray-700 py-1 px-6 rounded"
                                onClick={() => handleModal(mentor?._id)}
                              >
                                View
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              {mentor?.is_blocked ? (
                                <button
                                  className="py-1 px-5 rounded bg-color-five text-black"
                                  onClick={() =>
                                    handleClick(mentor?._id, "unblock")
                                  }
                                >
                                  Unblock
                                </button>
                              ) : (
                                <button
                                  className="py-1 px-5 rounded bg-red-600 hover:bg-red-500 text-black"
                                  onClick={() =>
                                    handleClick(mentor?._id, "block")
                                  }
                                >
                                  Block
                                </button>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </>
                    );
                  })}
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
              <div>
                <h1 className="text-3xl text-gray-400 py-5">
                  Not Mentees are Available
                </h1>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MentorManagement;
