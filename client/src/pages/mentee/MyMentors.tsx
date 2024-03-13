import { useEffect, useState } from "react";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import MessageIcon from "@mui/icons-material/Message";
import PaymentsIcon from "@mui/icons-material/Payments";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const MyMentors = () => {
  const axiosPrivate = useAxiosPrivate();
  const [myMentors, setMyMentors] = useState();
  const [isMentor, setIsMentor] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axiosPrivate.get("/my-mentors", {
          withCredentials: true,
        });
        console.log("My Mentors", response.data?.mentors);
        if (response.data?.mentors.length > 0) {
          setMyMentors(response.data?.mentors);
        } else {
          setIsMentor(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplications();
  }, [axiosPrivate]);
  return (
    <>
      <div className="w-full h-full md:h-screen">
        {isMentor === true ? (
          <div className="w-full h-screen flex justify-center items-center">
            <h1 className="text-2xl font-bold">Please Apply to a Mentor</h1>
            <Link
              to={"/mentor/browse"}
              className="mt-5 rounded bg-color-one text-white border px-2 py-1"
            >
              Find Mentors
            </Link>
          </div>
        ) : (
          <div className="px-5 md:px-10 md:py-10">
            <div className="py-5 font-bold text-2xl">
              <h1>My Mentors</h1>
            </div>
            <hr />
            <div className="flex w-full flex-wrap">
              {myMentors?.map((mentor, index: number) => {
                return (
                  <div key={index}>
                    <figure
                      key={index}
                      className="md:w-96 min-h-full rounded-xl p-8 shadow-lg mt-2 ml-2"
                    >
                      <div className="flex">
                        <img
                          className="w-24 h-24 rounded-full object-cover"
                          id="profile_img"
                          alt="profile_img"
                          src={mentor?.mentorProfile[0]?.profile_img}
                        />
                        <div className="px-2 py-2 font-bold">
                          <h1 className="text-xl">
                            {mentor?.mentorProfile[0]?.first_name}
                            {mentor?.mentorProfile[0]?.last_name}
                          </h1>
                          <h1 className="mt-2 uppercase text-sm text-gray-600">
                            {mentor?.mentorProfile[0]?.job_title}
                          </h1>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <a href={mentor?.mentorProfile[0]?.linkedIn}>
                          <LinkedInIcon className="text-blue-600" />
                        </a>
                        <a
                          href={mentor?.mentorProfile[0]?.twitter}
                          className="ml-10"
                        >
                          <XIcon />
                        </a>
                      </div>
                      <div className="pt-6 space-y-4">
                        <figcaption>
                          <div className="flex justify-around">
                            <button
                              className="border-2 px-2 py-2 rounded-md text-black"
                              onClick={() => {
                                navigate(
                                  `/my-mentors/paymentDetails/${mentor?._id}`
                                );
                              }}
                            >
                              <PaymentsIcon />
                            </button>
                            <Link
                              to={`/chat/${mentor?.mentor_id}`}
                              className="border-2 px-2 py-2 rounded-md text-black"
                            >
                              <MessageIcon />
                            </Link>
                            <Link
                              to={`/video/${mentor?.mentor_id}`}
                              className="border-2 px-2 py-2 rounded-md text-white"
                              target="_blank"
                            >
                              <VideoChatIcon className="text-black" />
                            </Link>
                          </div>
                          <div className="px-3">
                            <h1 className="py-2">{format(mentor.createdAt)}</h1>
                          </div>
                        </figcaption>
                      </div>
                    </figure>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyMentors;
