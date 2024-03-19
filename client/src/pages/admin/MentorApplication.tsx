import { AdminSidebar } from "../../componets/adminsidebar/AdminSidebar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { ApplicationObj } from "../../datatypes/Datatypes";
import API from "../../api";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "first_name", headerName: "First name", width: 200 },
  { field: "last_name", headerName: "Last name", width: 180 },
  {
    field: "mentorEmail",
    headerName: "Email",
    width: 320,
  },
  {
    field: "Check",
    renderCell: (cellValue) => {
      const id = cellValue.row._id;
      return (
        <Link
          to={`/admin/application-review/${id}`}
          className="text-white text-center border bg-color-five rounded-md py-1 w-20 h-8"
        >
          View
        </Link>
      );
    },
  },
];

const MentorApplication = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const applicationData = async () => {
      try {
        const response = await API.get("/admin/mentor-applications", {
          withCredentials: true,
        });
        if (response.status) {
          const data = response.data.applications;
          data.forEach((item: ApplicationObj, index: number) => {
            item.id = index + 1;
          });
          setDetails(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    applicationData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 h-screen bg-background-two">
        <div className="hidden md:block col-span-3">
          <AdminSidebar />
        </div>
        <div className="col-span-9 h-screen">
          <div className="mt-4">
            <h1 className="font-bold text-gray-400">
              Dashboard / <small>Applications</small>
            </h1>
          </div>
          <div className="w-screen mr-3 md:w-full mt-10 rounded-md">
            {details.length > 0 ? (
              <DataGrid
                rows={details}
                columns={columns}
                pageSizeOptions={[5, 10]}
              />
            ) : (
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-400">
                  No Applications are Pending
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorApplication;
