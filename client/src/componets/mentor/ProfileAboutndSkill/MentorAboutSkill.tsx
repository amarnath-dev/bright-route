import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import Tooltip from "@mui/material/Tooltip";
import Reportmentor from "../../mentee/ReportMentor/Reportmentor";
import React, { useState } from "react";
import { mentorProfileObj } from "../../../datatypes/Datatypes";

interface MentorProfileCardProps {
  mentor: mentorProfileObj | undefined;
  user: string;
}

const MentorAboutSkill: React.FC<MentorProfileCardProps> = ({
  mentor,
  user,
}) => {
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
            {user === "mentee" ? (
              <span className="cursor-pointer" onClick={() => setOpen(true)}>
                <Tooltip title={"Report"}>
                  <ReportGmailerrorredIcon className="text-gray-400" />
                </Tooltip>
              </span>
            ) : (
              ""
            )}
          </div>
          <label
            htmlFor="bio"
            className="block mb-2 text-sm font-medium text-gray-400"
          >
            ABOUT ME
          </label>
          <textarea
            id="bio"
            rows={12}
            disabled
            defaultValue={mentor?.bio}
            className="block p-2.5 w-full text-lg rounded-lg focus:border-gray text-gray-400 bg-background-two"
          ></textarea>
        </div>
        <div className="mt-5 rounded-md px-2 py-2">
          <h1 className="block mb-2 text-lg font-medium text-gray-400">
            Skills
          </h1>
          <div className="mt-3 h-full flex flex-wrap">
            {mentor?.skills.map((skill: string, index: number) => {
              return (
                <span
                  key={index}
                  className="rounded-full bg-gray-600 px-6 py-1 ml-2 mb-2"
                  style={{ whiteSpace: "nowrap" }}
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

export default MentorAboutSkill;
