import { AdminSidebar } from "../../componets/adminsidebar/AdminSidebar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FormEvent, useEffect, useState } from "react";
import { cellValue } from "../../datatypes/Datatypes";
import { ApplicationObj } from "../../datatypes/Datatypes";
import API from "../../api";

const handleClick = (e: FormEvent, cellvalue: cellValue) => {
  e.preventDefault();
  console.log(cellvalue.row);
};

const columns: GridColDef[] = [
  { field: "first_name", headerName: "First name", width: 200 },
  { field: "last_name", headerName: "Last name", width: 180 },
  {
    field: "job_title",
    headerName: "Job Position",
    width: 320,
  },
  {
    field: "Check",
    renderCell: (cellValues) => {
      return (
        <button
          className="text-white border bg-color-five rounded-md py-1 px-1 w-20"
          onClick={(e) => {
            handleClick(e, cellValues);
          }}
        >
          View
        </button>
      );
    },
  },
];

export const MentorApplication = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const applicationDeta = async () => {
      try {
        const response = await API.get("admin/mentor-applications");
        if (response.status) {
          const data = response.data.applications;
          data.forEach((item: ApplicationObj, index: number) => {
            item.id = index + 1;
          });
          console.log("after adding the index", data);
          setDetails(data);
        }
      } catch (error) {
        throw new Error("Details fetch failed");
      }
    };
    applicationDeta();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12 w-screen h-screen">
        <div className="col-span-3 ml-4 mt-4">
          <AdminSidebar />
        </div>

        <div className="col-span-9 h-screen">
          <div className="mt-4">
            <h1 className="font-bold">
              Dashboard / <small>Applications</small>
            </h1>
          </div>
          <div className="w-full mt-10 rounded-md">
            <DataGrid
              rows={details}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
        </div>
      </div>
    </>
  );
};
