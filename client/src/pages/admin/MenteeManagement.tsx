import { AdminSidebar } from "../../componets/adminsidebar/AdminSidebar";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { useEffect, useState } from "react";

const MenteeManagement = () => {
  const axiosPrivate = useAxiosPrivate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mentee, setMentee] = useState();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axiosPrivate.get("admin/get-all-mentee", {
          withCredentials: true,
        });
        if (response.data) {
          setMentee(response.data);
        }
      } catch (error) {
        console.log("Mentee Data Fetch Failed");
        console.log(error);
      }
    };
    fetchMentors();
  }, [axiosPrivate]);
  return (
    <>
      <div className="grid grid-cols-12 h-screen">
        <div className="hidden md:block col-span-3">
          <AdminSidebar />
        </div>
        <div className="col-span-12 md:col-span-9 h-screen px-2 py-2">
          <div className="mt-4">
            <div>
              <h1 className="font-bold">
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
                  className="border border-gray-500 text-sm rounded block ps-10 p-2.5"
                  placeholder="Search users..."
                />
              </div>
            </form>
          </div>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right rounded">
              <thead className="text-xs border-2 rounded">
                <tr>
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
                <tr className="bg-white border-b">
                  <th scope="row" className="px-6 py-4 font-medium">
                    Amarnath as
                  </th>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                  <td className="px-6 py-4">
                    <button className="border-2 py-1 px-1 rounded">
                      Block
                    </button>
                  </td>
                </tr>
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
            <span className="text-sm">
              Showing <span className="font-semibold">1</span> to
              <span className="font-semibold">10</span> of
              <span className="font-semibold">100</span> Entries
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenteeManagement;
