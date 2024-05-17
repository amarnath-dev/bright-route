import { useEffect, useState } from "react";
import NavBar from "../../componets/Navbar";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
import { Link } from "react-router-dom";
import MessageIcon from "@mui/icons-material/Message";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useNavigate } from "react-router-dom";
import NoImage from "../../assets/images/no-profile-image.png";
import { Expired } from "../../interfaces/mentor.interface";

const MentorHistory = () => {
  const axiosPrivate = useAxiosPrivate();
  const [expired, setExpired] = useState<Expired[] | []>();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get("/mentor/expired", {
          withCredentials: true,
        });
        if (response.data.status === "success") {
          setExpired(response.data.expired);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [axiosPrivate]);

  useEffect(() => {
    if (expired && expired.length > 0) {
      const fetchProfileImages = async () => {
        try {
          const fetchedMentees = await Promise.all(
            expired.map(async (menteeObj) => {
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
          console.log(fetchedMentees);
          setExpired(fetchedMentees);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProfileImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expired?.length]);

  return (
    <>
      <NavBar />
      <div className="w-full h-full md:h-screen bg-background-two">
        {expired && expired?.length === 0 ? (
          <div className="w-full h-screen flex justify-center items-center flex-col">
            <h1 className="text-3xl font-bold text-gray-400">
              Your Mentee History is Empty
            </h1>
          </div>
        ) : (
          <>
            <div className="px-2 md:px-10 md:py-10 w-full">
              <div className="py-5 font-bold text-2xl">
                <h1 className="text-white">My Mentee History</h1>
              </div>
              <hr />
              <div className="flex flex-col md:flex-row w-full h-full flex-wrap py-3">
                {expired?.map((plan, index: number) => {
                  return (
                    <div key={index} className="px-1">
                      <figure className="md:w-96 min-h-full rounded-xl p-8 shadow-md md:shadow-lg bg-gray-800 mt-2">
                        <div className="flex">
                          <img
                            className="w-24 h-24 rounded-full object-cover"
                            alt="profile_img"
                            src={
                              plan?.profile_img ? plan?.profile_img : NoImage
                            }
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
                            </div>
                            <div className="px-3">
                              <h1 className="py-2 text-md font-bold text-red-400">
                                Plan Expired
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

export default MentorHistory;
