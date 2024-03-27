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
import { MyMenteePayment } from "../../datatypes/PropsTypes";
import NavBar from "../../componets/navbar/Navbar";

const MyMentees = () => {
  const [myMentees, setMyMentees] = useState<MyMenteePayment[]>([]);
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
      const fetchProfileImages = async () => {
        try {
          const fetchedMentees = await Promise.all(
            myMentees.map(async (menteeObj) => {
              const imageId = menteeObj?.menteeDetails?.profile_img;
              if (imageId) {
                const imageRef = ref(storage, imageId);
                const url = await getDownloadURL(imageRef);

                return { ...menteeObj, profile_img: url };
              } else {
                return menteeObj;
              }
            })
          );
          setMyMentees(fetchedMentees);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProfileImages();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myMentees.length]);

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
      <NavBar />
      <div className="w-full h-full md:h-screen bg-background-two">
        {isApplication === true ? (
          <div className="w-full h-screen flex justify-center items-center flex-col">
            <h1 className="text-3xl font-bold text-gray-400">
              No Mentees have Applied Yet
            </h1>
          </div>
        ) : (
          <>
            <div className="px-2 md:px-10 md:py-10 w-full">
              <div className="py-5 font-bold text-2xl">
                <h1 className="text-white">My Mentees</h1>
              </div>
              <hr />
              <div className="flex flex-col md:flex-row w-full h-full flex-wrap py-3">
                {myMentees?.map((plan, index: number) => {
                  return (
                    <div key={index} className="px-1">
                      <figure className="md:w-96 min-h-full rounded-xl p-8 shadow-md md:shadow-lg bg-gray-800 mt-2">
                        <div className="flex">
                          <img
                            className="w-24 h-24 rounded-full object-cover"
                            alt="profile_img"
                            src={plan?.profile_img ? plan?.profile_img : "https://www.pngkey.com/png/full/52-522921_kathrine-vangen-profile-pic-empty-png.png"}
                          />
                          <div className="px-2 py-2 font-bold">
                            <h1 className="text-xl text-white">
                              {plan?.menteeDetails?.first_name}
                              {plan?.menteeDetails?.last_name}
                            </h1>
                            <h1 className="mt-2 uppercase text-sm text-white">
                              {plan?.menteeDetails?.job_title}
                            </h1>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <a href={plan?.menteeDetails?.linkedIn}>
                            <LinkedInIcon className="text-blue-600" />
                          </a>
                          <a
                            href={plan?.menteeDetails?.twitter}
                            className="ml-10"
                          >
                            <XIcon className="text-gray-400" />
                          </a>
                        </div>
                        <div className="pt-6 space-y-4">
                          <figcaption>
                            <div className="flex justify-around">
                              <button
                                className="border px-2 py-2 rounded-md text-black"
                                onClick={() => {
                                  navigate(
                                    `/mentor/mentees/paymentdetails/${plan?._id}`
                                  );
                                }}
                              >
                                <PaymentsIcon className="text-gray-300" />
                              </button>
                              <Link
                                to={`/mentor/chat/${plan?.mentee_id}`}
                                className="border px-2 py-2 rounded-md text-black"
                              >
                                <MessageIcon className="text-gray-300" />
                              </Link>
                              <Link
                                to={`/video/${plan?.mentee_id}`}
                                className="border px-2 py-2 rounded-md text-white"
                                target="_blank"
                              >
                                <VideoChatIcon className="text-gray-300" />
                              </Link>
                            </div>
                            <div className="px-3">
                              <h1 className="py-2 text-gray-400">
                                {format(plan?.createdAt)}
                              </h1>
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
