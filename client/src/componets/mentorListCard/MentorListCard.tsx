import { FC } from "react";
import { mentorProfileObj } from "../../datatypes/Datatypes";
import { useNavigate } from "react-router-dom";

interface MentorListCardProps {
  filtered: mentorProfileObj[] | [];
}

export const MentorListCard: FC<MentorListCardProps> = ({ filtered }) => {
  const navigate = useNavigate();
  return (
    <>
      {filtered.length === 0 ? (
        <>
          <div className="w-full min-h-screen bg-background-two flex justify-center">
            <h1 className="text-balck text-3xl text-white">No Results Found</h1>
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-full flex justify-center items-center flex-col px-4 py-4 md:py-0 md:px-0 bg-background-two">
            {filtered?.map((mentor, index) => (
              <div
                key={index}
                className="w-full mt-5 border-2 border-gray-700 rounded-lg px-4 py-4 md:px-2 md:py-2 md:w-9/12 md:mt-10"
              >
                <div className="flex flex-col px-4 py-4 md:flex-row text-white">
                  <div className="relative flex justify-center h-full">
                    <img
                      alt="mentor_img"
                      className="rounded-lg md:w-60 md:h-80"
                      id="mentor_img"
                      src={
                        mentor?.imageUrl ||
                        "https://st4.depositphotos.com/3265223/21282/v/450/depositphotos_212821870-stock-illustration-default-avatar-photo-placeholder-profile.jpg"
                      }
                    />
                    <div className="bg-gradient-to-t from-gray-600 to-transparent w-full h-full px-5 py-5 rounded-lg absolute top-0 md:w-60 md:h-80">
                      <div className="md:hidden mt-36 absolute bottom-5">
                        <h1 className="text-lg font-semibold text-white md:text-3xl md:px-5 md:py-2">
                          {mentor?.first_name} {mentor?.last_name}
                        </h1>
                        <h1 className="md:px-5 md:mt-0 text-sm md:text-xl md:text-gray-800">
                          {mentor?.job_title}
                          <strong className="md:text-gray-800 ml-1">
                            {mentor?.company}
                          </strong>
                        </h1>
                        <div className="text-lg font-bold text-color-five">
                          <span className="text-lg">{mentor?.spots}</span>
                          <span> Spots Left</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 md:px-0">
                    <div className="hidden md:block">
                      <div className="flex justify-between">
                        <h1 className="text-xl font-semibold md:text-3xl md:px-5">
                          {mentor?.first_name} {mentor?.last_name}{" "}
                        </h1>
                        <div className="text-xl font-bold text-color-five">
                          <span className="text-2xl">{mentor?.spots}</span>
                          <span> Spots Left</span>
                        </div>
                      </div>

                      <h1 className="md:px-5 mt-2 md:mt-0 text-md md:text-xl">
                        {mentor?.job_title}
                        <strong className="ml-1">{mentor?.company}</strong>
                      </h1>
                    </div>

                    <div className="w-full md:max-w-2xl md:ml-4 mt-6 md:px-3 md:py-3 text-md">
                      <p className="text-md w-full">{mentor?.bio}</p>
                      <div className="w-full mt-5">
                        {mentor.skills.map((skill, index) => (
                          <button
                            key={index}
                            className="rounded-full px-3 text-gray-900 bg-gray-300 text-semibold ml-1"
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                      <div className="w-full mt-6 flex justify-between items-center flex-col md:flex-row">
                        <div className="w-full">
                          <button
                            className="w-full rounded-md px-1 py-1 text-gray-300 bg-color-five text-lg font-bold md:h-10 md:w-96"
                            onClick={() =>
                              navigate(`/mentor-profile/${mentor?.mentor_id}`)
                            }
                          >
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
      )}
    </>
  );
};
