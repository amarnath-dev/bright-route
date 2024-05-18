import { AdminSidebar } from "../../componets/AdminSidebar";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MenteeDetails } from "../../interfaces/admin.interface";
import useDebounce from "../../hooks/useDebounce";

const MenteeManagement = () => {
  const axiosPrivate = useAxiosPrivate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mentee, setMentee] = useState<MenteeDetails[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(search, 500);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axiosPrivate.get("/admin/mentee", {
          withCredentials: true,
        });
        if (response.data) {
          setMentee(response.data?.mentees);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMentors();
  }, [axiosPrivate]);

  const handleClick = async (menteeId: string, type: string) => {
    try {
      if (type === "block") {
        const response = await axiosPrivate.patch(
          `/admin/block/${menteeId}`,
          {},
          { withCredentials: true }
        );
        if (response.data.status === "success") {
          const updatedUsers = mentee.map((user) => {
            if (user?._id === menteeId) {
              return { ...user, is_blocked: true };
            }
            return user;
          });
          setMentee(updatedUsers);
          toast.success(response.data.message);
        }
      } else {
        const response = await axiosPrivate.patch(
          `/admin/unblock/${menteeId}`,
          {},
          { withCredentials: true }
        );
        if (response.data.status === "success") {
          const updatedUsers = mentee.map((user) => {
            if (user?._id === menteeId) {
              return { ...user, is_blocked: false };
            }
            return user;
          });
          setMentee(updatedUsers);
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search) {
      (async () => {
        try {
          const reponse = await axiosPrivate.get(
            `/admin/mentee/search?name=${search}`
          );
          console.log(reponse);
        } catch (error) {
          console.log(error);
          toast.error("Search Failed");
        }
      })();
      console.log("API call with:", debouncedSearchTerm);
    }
  }, [axiosPrivate, debouncedSearchTerm, search]);

  useEffect(() => {
    async () => {
      try {
        const response = await axiosPrivate.post(
          "/admin/mentee/search",
          { search },
          { withCredentials: true }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
  }, [axiosPrivate, search, setSearch]);

  const handleNext = () => {
    try {
      console.log("Get Next");
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
                <span
                  onClick={() => navigate("/admin/dashboard")}
                  className="cursor-pointer"
                >
                  Dashboard
                </span>
                / <small>Mentee Management</small>
              </h1>
            </div>
          </div>

          <div className="mt-5 mb-2 w-full">
            <div>
              <input
                type="text"
                id="simple-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-gray-500 text-sm rounded block ps-5 p-2.5 bg-gray-800 text-gray-400"
                placeholder="Search Users..."
              />
            </div>
          </div>
          {mentee.length > 0 ? (
            <>
              <div className="relative overflow-x-auto py-10">
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
                        Block/Unblock
                      </th>
                    </tr>
                  </thead>
                  {mentee.map((mentee: MenteeDetails, index: number) => {
                    return (
                      <>
                        <tbody key={index}>
                          <tr className="bg-gray-800 border-b text-gray-400">
                            <th scope="row" className="px-6 py-4 font-medium">
                              {mentee.profileDetails?.first_name}{" "}
                              {mentee.profileDetails?.last_name}
                            </th>
                            <td className="px-6 py-4">{mentee?.email}</td>
                            <td className="px-6 py-4">
                              {mentee.is_blocked ? (
                                <button
                                  className="py-1 px-5 rounded bg-color-five text-black"
                                  onClick={() =>
                                    handleClick(mentee?._id, "unblock")
                                  }
                                >
                                  Unblock
                                </button>
                              ) : (
                                <button
                                  className="py-1 px-5 rounded bg-red-600 hover:bg-red-500 text-black"
                                  onClick={() =>
                                    handleClick(mentee?._id, "block")
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
                  <button
                    className="flex items-center justify-center px-3 h-8 text-sm font-medium bg-gray-200 hover:bg-gray-300 border-0 border-s rounded-e"
                    onClick={handleNext}
                  >
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

export default MenteeManagement;
