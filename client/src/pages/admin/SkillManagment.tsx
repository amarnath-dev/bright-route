import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { AdminSidebar } from "../../componets/adminsidebar/AdminSidebar";

export const SkillManagment = () => {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="grid col-span-3">
          <AdminSidebar />
        </div>
        <div className="h-screen w-full col-span-9 justify-center">
          <div className="mt-4">
            <h1 className="font-bold">
              Dashboard / <small>Skill Managment</small>
            </h1>
          </div>
          <div className="w-full h-full bg-red-200">
            <div className="w-full border-2 bg-green-300">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2">
                  <thead className="text-xs uppercase text-black bg-gray-50 border-2">
                    <tr className="border-2">
                      <th scope="col" className="px-6 py-3">
                        Skill
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-2">
                    <tr className="bg-white border-2">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap text-black"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">
                        <Tooltip title="Delete">
                          <IconButton>
                            <DeleteIcon className="text-black" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                    <tr className="bg-white border-2">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap text-black"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">
                        <Tooltip title="Delete">
                          <IconButton>
                            <DeleteIcon className="text-black" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                    <tr className="bg-white border-2">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap text-black"
                      >
                        Apple MacBook Pro 17"
                      </th>
                      <td className="px-6 py-4">
                        <Tooltip title="Delete">
                          <IconButton>
                            <DeleteIcon className="text-black" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
