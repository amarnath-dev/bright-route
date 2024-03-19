import { AdminSidebar } from "../../componets/adminsidebar/AdminSidebar";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { useEffect, useState } from "react";

interface Mentee {
  _id: string;
  email: string;
  is_blocked: boolean;
  role: string;
  profileDetails: MenteeProfile;
}

interface MenteeProfile {
  _id: string;
  mentee_id: string;
  first_name: string;
  last_name: string;
  job_title: string;
  linkedIn: string;
  twitter: string;
  goal: string;
}

const MenteeManagement = () => {
  const axiosPrivate = useAxiosPrivate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mentee, setMentee] = useState<Mentee[]>([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axiosPrivate.get("admin/mentee", {
          withCredentials: true,
        });
        if (response.data) {
          console.log(response.data?.mentees);
          setMentee(response.data?.mentees);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMentors();
  }, [axiosPrivate]);

  const handleClick = async () => {
    try {
      console.log("Error");
    } catch (error) {
      console.log(error);
    }
  };
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
                Dashboard / <small>Mentee Management</small>
              </h1>
            </div>
          </div>

          <div className="mt-5 mb-2 w-full">
            <form>
              <div>
                <input
                  type="text"
                  id="simple-search"
                  className="border-gray-500 text-sm rounded block ps-5 p-2.5 bg-gray-800 text-gray-400"
                  placeholder="Search Users..."
                />
              </div>
            </form>
          </div>

          {mentee.length > 0 ? (
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

                  <tbody>
                    {mentee.map((mentee: Mentee, index: number) => {
                      return (
                        <>
                          <tr
                            className="bg-gray-800 border-b text-gray-400"
                            key={index}
                          >
                            <th scope="row" className="px-6 py-4 font-medium">
                              {mentee.profileDetails?.first_name}{" "}
                              {mentee.profileDetails?.last_name}
                            </th>
                            <td className="px-6 py-4">{mentee?.email}</td>
                            <td className="px-6 py-4">0</td>
                            <td className="px-6 py-4">
                              <button className="underline hover:text-blue-500">
                                View
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                className="py-1 px-5 rounded bg-red-600 hover:bg-red-500 text-black"
                                onClick={handleClick}
                              >
                                Block
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
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
              <div>
                <h1 className="text-xl">Not Mentees are Available</h1>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MenteeManagement;
