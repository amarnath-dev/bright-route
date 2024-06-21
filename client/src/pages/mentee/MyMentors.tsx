import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import MessageIcon from "@mui/icons-material/Message";
import PaymentsIcon from "@mui/icons-material/Payments";
// import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
import { PaymentDetails } from "../../interfaces/mentee.interface";
import NavBar from "../../componets/Navbar";
import NoImage from "../../assets/images/no-profile-image.png";
import RateMentor from "../../componets/RateMentor";

const MyMentors = () => {
  const axiosPrivate = useAxiosPrivate();
  const [myMentors, setMyMentors] = useState<PaymentDetails[]>([]);
  const [isMentor, setIsMentor] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [mentorId, setMentorId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get("/my-mentors", {
          withCredentials: true,
        });
        if (response.data?.mentors.length > 0) {
          setMyMentors(response.data?.mentors);
        } else {
          setIsMentor(true);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [axiosPrivate]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        myMentors?.map((mentor: PaymentDetails) => {
          const imageId = mentor.mentorProfile[0]?.profile_img;
          if (imageId) {
            const imageRef = ref(storage, imageId);
            getDownloadURL(imageRef)
              .then((url) => {
                mentor["newProfileImg"] = url;
                const img = document.getElementById(
                  "profile_img"
                ) as HTMLImageElement;
                img.src = url;
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchImage();
  }, [myMentors]);

  const handleRating = (mentorId: string) => {
    setMentorId(mentorId);
    setOpenModal(true);
  };
  return (
    <>
      <NavBar />
      <RateMentor
        openModal={openModal}
        mentorId={mentorId ? mentorId : null}
        setOpenModal={setOpenModal}
      />
      <div className="w-full h-screen md:h-screen bg-background-two">
        {isMentor === true ? (
          <div className="w-full h-screen flex justify-center items-center flex-col">
            <h1 className="text-2xl font-bold text-white">
              Please Apply to a Mentor
            </h1>
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
              <h1 className="text-white">My Mentors</h1>
            </div>
            <hr />
            <div className="flex w-full flex-wrap">
              {myMentors?.map((mentor, index: number) => {
                return (
                  <>
                    {mentor.isExpired ? (
                      ""
                    ) : (
                      <>
                        <div key={index}>
                          <figure
                            key={index}
                            className="md:w-96 min-h-full rounded-xl p-8 shadow-lg mt-2 ml-2 bg-gray-800"
                          >
                            <div
                              className="flex cursor-pointer"
                              onClick={() =>
                                navigate(`/mentor-profile/${mentor?.mentor_id}`)
                              }
                            >
                              <img
                                className="w-24 h-24 rounded-full object-cover"
                                id="profile_img"
                                src={
                                  mentor?.mentorProfile[0]?.profile_img
                                    ? mentor?.mentorProfile[0].profile_img
                                    : NoImage
                                }
                              />
                              <div className="px-2 py-2 font-bold">
                                <h1 className="text-xl text-white">
                                  {mentor?.mentorProfile[0]?.first_name}
                                  {mentor?.mentorProfile[0]?.last_name}
                                </h1>
                                <h1 className="mt-2 uppercase text-sm text-white">
                                  {mentor?.mentorProfile[0]?.job_title}
                                </h1>
                              </div>
                            </div>
                            <div className="flex justify-center">
                              <a href={mentor?.mentorProfile[0]?.linkedIn}>
                                <LinkedInIcon className="text-blue-500" />
                              </a>
                              <a
                                href={mentor?.mentorProfile[0]?.twitter}
                                className="ml-10"
                              >
                                <XIcon className="text-gray-300" />
                              </a>
                            </div>
                            <div className="pt-6 space-y-4">
                              <figcaption>
                                <div className="flex justify-around">
                                  <button
                                    className="border px-2 py-2 rounded-md text-black"
                                    onClick={() => {
                                      navigate(
                                        `/my-mentors/paymentDetails/${mentor?._id}`
                                      );
                                    }}
                                  >
                                    <PaymentsIcon className="text-gray-300" />
                                  </button>
                                  <Link
                                    to={`/chat/${mentor?.mentor_id}`}
                                    className="border px-2 py-2 rounded-md text-gray-300"
                                  >
                                    <MessageIcon />
                                  </Link>
                                  <Link
                                    to={`/video/${mentor?.mentor_id}`}
                                    className="border px-2 py-2 rounded-md text-gray-300"
                                    target="_blank"
                                  >
                                    <VideoChatIcon />
                                  </Link>
                                </div>
                                <div className="px-3 flex justify-between">
                                  <h1 className="py-2 font-bold text-blue-400">
                                    {/* {30 - parseInt(format(mentor?.createdAt))}{" "} */}
                                   30 Days Left
                                  </h1>
                                  <button
                                    className="text-blue-500"
                                    onClick={() =>
                                      handleRating(mentor?.mentor_id)
                                    }
                                  >
                                    Rate Mentor
                                  </button>
                                </div>
                              </figcaption>
                            </div>
                          </figure>
                        </div>
                      </>
                    )}
                  </>
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
