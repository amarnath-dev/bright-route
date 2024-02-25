import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import Tooltip from "@mui/material/Tooltip";
import Reportmentor from "../../mentee/ReportMentor/Reportmentor";
import { useState } from "react";

export const MentorAboutSkill = ({ mentor, user }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open === true ? (
        <div className="flex justify-center items-center">
          <Reportmentor setOpen={setOpen} mentor={mentor} />
        </div>
      ) : (
        ""
      )}
      <div className="md:h-full py-5 md:px-8 md:py-8 rounded-md">
        <div className="px-2 md:px-0 relative">
          <div className="absolute top-0 right-3">
            <span className="cursor-pointer" onClick={() => setOpen(true)}>
              <Tooltip title={"Report"}>
                <ReportGmailerrorredIcon />
              </Tooltip>
            </span>
          </div>
          <label htmlFor="bio" className="block mb-2 text-sm font-medium">
            ABOUT ME
          </label>
          <textarea
            id="bio"
            rows={12}
            disabled
            defaultValue={mentor?.bio}
            className="block p-2.5 w-full text-lg rounded-lg focus:border-gray text-black bg-white"
          ></textarea>
        </div>

        <div className="mt-5 rounded-md px-2 py-2">
          <h1 className="block mb-2 text-lg font-medium">Skills</h1>
          <div className="mt-3 h-full flex-wrap">
            {mentor?.skills.map((skill, index: number) => {
              return (
                <span
                  key={index}
                  className="rounded-full bg-blue-200 px-6 py-1 ml-2"
                >
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
