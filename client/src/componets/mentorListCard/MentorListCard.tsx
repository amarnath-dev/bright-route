import { FC } from "react";
import { mentorProfileObj } from "../../datatypes/Datatypes";

interface MentorListCardProps { 
  filtered: mentorProfileObj[];
}

export const MentorListCard: FC<MentorListCardProps> = ({ filtered }) => {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center flex-col px-4 py-4 mt-2 md:mt-10 md:py-0 md:px-0">
        {filtered.map((mentor, index) => (
          <div
            key={index}
            className="w-full mt-5 border-2 rounded-lg px-4 py-4 md:px-2 md:py-2 md:w-9/12 md:mt-10"
          >
            <div className="flex flex-col px-4 py-4 md:flex-row">
              <div className="relative flex justify-center h-full">
                <img
                  alt="mentor_img"
                  className="rounded-lg shadow-md md:w-60 md:h-80"
                  id="mentor_img"
                  src={mentor.imageUrl || "default_image_url"}
                />
                <div className="bg-gradient-to-t from-gray-600 to-transparent w-full h-full px-5 py-5 rounded-lg absolute top-0 md:w-60 md:h-80">
                  <div className="md:hidden mt-36 absolute bottom-5">
                    <h1 className="text-xl font-semibold text-white md:text-gray-800 md:text-3xl md:px-5 md:py-2">
                      {mentor.first_name} {mentor.last_name}
                    </h1>
                    <h1 className="md:px-5 mt-2 md:mt-0 text-sm md:text-xl md:text-gray-800 text-white">
                      {mentor.job_title}
                      <strong className="md:text-gray-800 text-white ml-1">
                        {mentor.company}
                      </strong>
                    </h1>
                  </div>
                </div>
              </div>

              <div className="px-5 md:px-0">
                <div className="hidden md:block">
                  <h1 className="text-xl mt-2 font-semibold text-gray-800 md:text-3xl md:px-5 md:py-2">
                    {mentor.first_name} {mentor.last_name}
                  </h1>
                  <h1 className="md:px-5 mt-2 md:mt-0 text-md md:text-xl">
                    {mentor.job_title}
                    <strong className="text-gray-800 ml-1">
                      {mentor.company}
                    </strong>
                  </h1>
                </div>

                <div className="w-full md:max-w-2xl md:ml-4 mt-6 text-gray-800 md:px-3 md:py-3 text-md">
                  <p className="text-md w-full">{mentor.bio}</p>
                  <div className="w-full mt-5">
                    {mentor.skills.map((skill, index) => (
                      <button
                        key={index}
                        className="border-2 rounded-full px-3 bg-slate-200 mt-2 ml-2"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  {/* Mentor payment setting is not done */}
                  <div className="w-full mt-6 flex justify-between items-center flex-col md:flex-row">
                    <div className="mb-2 w-full">
                      <h1 className="text-2xl md:text-3xl font-bold">
                        $350 <small>/month</small>
                      </h1>
                    </div>

                    <div className="w-full">
                      <button className="w-full border-2 rounded-md px-1 py-1 text-white bg-color-one text-lg font-bold md:h-10 md:w-96">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
