import { useEffect, useState } from "react";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../app/firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import MessageIcon from "@mui/icons-material/Message";
import PaymentsIcon from "@mui/icons-material/Payments";
import { format } from "timeago.js";
import { useAppSelector } from "../../app/hooks";

interface Mentee {
  _id: string;
  mentor_id: string;
  mentee_id: string;
  razorPay_id: string;
  plan_price: number;
  mentor_plan_id: string;
  goal_of_mentorship: string;
  time_to_reach_goal: string;
  message_to_mentor: string;
  paymentDone: boolean;
  duration: number;
  __v: number;
  menteeDetails: {
    first_name: string;
    last_name: string;
    job_title: string;
    profile_img: string;
  }[];
}

const MyMentees = () => {
  const [myMentees, setMyMentees] = useState<Mentee>([]);
  const [isApplication, setIsApplication] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userAuth);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axiosPrivate.get("/mentor/menteeApplications", {
          withCredentials: true,
        });
        if (response.data.mentorApplication.length > 0) {
          setMyMentees(response.data.mentorApplication);
        } else {
          setIsApplication(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchApplications();
  }, [axiosPrivate]);

  useEffect(() => {
    if (myMentees) {
      myMentees?.map((menteeObj) => {
        const imageId = menteeObj?.menteeDetails[0]?.profile_img;
        if (imageId) {
          const imageRef = ref(storage, imageId);
          getDownloadURL(imageRef)
            .then((url) => {
              menteeObj["newProfileImg"] = url;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
  }, [myMentees]);

  //Creating the chat Conversation
  useEffect(() => {
    if (myMentees) {
      myMentees?.map((menteeObj) => {
        const createConversation = async () => {
          await axiosPrivate.post(
            "chat/conversation",
            { receiverId: menteeObj.mentee_id, senderId: user?._id },
            { withCredentials: true }
          );
        };
        createConversation();
      });
    }
  }, [axiosPrivate, myMentees, user?._id]);

  return (
    <>
      <div className="w-full h-full md:h-screen">
        {isApplication === true ? (
          <div className="w-full h-screen flex justify-center items-center flex-col">
            <h1 className="text-2xl font-bold">No Mentees have Applied Yet</h1>
            <img
              src="https://cdnl.iconscout.com/lottie/premium/thumb/empty-box-5708298-4748209.gif"
              className="w-40"
              alt="empty_img"
            />
          </div>
        ) : (
          <>
            <div className="px-2 md:px-10 md:py-10 w-full">
              <div className="py-5 font-bold text-2xl">
                <h1>My Mentees</h1>
              </div>
              <hr />
              <div className="flex w-full h-full flex-wrap py-3">
                {myMentees.map((plan, index: number) => {
                  return (
                    <div>
                      <figure
                        key={index}
                        className="md:w-96 min-h-full rounded-xl p-8 shadow-md md:shadow-lg mt-2 ml-2"
                      >
                        <div className="flex">
                          <img
                            className="w-24 h-24 rounded-full object-cover"
                            id="profile_img"
                            alt="profile_img"
                            src={plan?.newProfileImg}
                          />
                          <div className="px-2 py-2 font-bold">
                            <h1 className="text-xl">
                              {plan?.menteeDetails[0]?.first_name}
                              {plan?.menteeDetails[0]?.last_name}
                            </h1>
                            <h1 className="mt-2 uppercase text-sm text-gray-600">
                              {plan?.menteeDetails[0]?.job_title}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <a href={plan?.menteeDetails[0]?.linkedIn}>
                            <LinkedInIcon className="text-blue-600" />
                          </a>
                          <a
                            href={plan?.menteeDetails[0]?.twitter}
                            className="ml-10"
                          >
                            <XIcon />
                          </a>
                        </div>
                        <div className="pt-6 space-y-4">
                          <blockquote>
                            <p className="text-lg">
                              {plan?.goal_of_mentorship}
                            </p>
                          </blockquote>
                          <figcaption>
                            <div className="flex justify-around">
                              <button
                                className="border-2 px-2 py-2 rounded-md text-black"
                                onClick={() => {
                                  navigate(
                                    `/mentor/mentees/paymentdetails/${plan?._id}`
                                  );
                                }}
                              >
                                <PaymentsIcon />
                              </button>
                              <Link
                                to={`/mentor/chat/${plan?.mentee_id}`}
                                className="border-2 px-2 py-2 rounded-md text-black"
                              >
                                <MessageIcon />
                              </Link>
                              <Link
                                to={`/video/${plan?.mentee_id}`}
                                className="border-2 px-2 py-2 rounded-md text-white"
                                target="_blank"
                              >
                                <VideoChatIcon className="text-black" />
                              </Link>
                            </div>
                            <div className="px-3">
                              <h1 className="py-2">{format(plan.createdAt)}</h1>
                            </div>
                          </figcaption>
                        </div>
                      </figure>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyMentees;
