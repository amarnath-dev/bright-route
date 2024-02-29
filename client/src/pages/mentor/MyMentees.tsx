import { useEffect, useState } from "react";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../app/firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MyMentees = () => {
  const [myMentees, setMyMentees] = useState();
  const [menteeDetails, setMenteeDetails] = useState();
  const [isApplication, setIsApplication] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axiosPrivate.get("/mentor/menteeApplications", {
          withCredentials: true,
        });
        if (response.data) {
          setProfileImg(
            response.data.mentorApplication[0].menteeDetails[0].profile_img
          );
          setMenteeDetails(response.data.mentorApplication[0].menteeDetails[0]);
          setMyMentees(response.data.mentorApplication[0]);
          setIsApplication(false);
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
    console.log(myMentees);
  }, [myMentees]);

  useEffect(() => {
    const imageId = profileImg;
    if (imageId) {
      const imageRef = ref(storage, imageId);
      getDownloadURL(imageRef)
        .then((url) => {
          const img = document.getElementById(
            "profile_img"
          ) as HTMLImageElement;
          img.src = url;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [myMentees, profileImg]);

  return (
    <>
      <div className="w-full h-screen">
        {isApplication === true ? (
          <div className="w-full h-screen flex justify-center items-center">
            <h1 className="text-2xl font-bold">No Mentees Applied Yet</h1>
          </div>
        ) : (
          <div className="px-10 py-10">
            <div className="py-5 font-bold text-2xl">
              <h1>My Mentees</h1>
            </div>
            <hr />
            <figure className="bg-slate-100 w-96 rounded-xl p-8 shadow-lg mt-2">
              <div className="flex">
                <img
                  className="w-24 h-24 rounded-full object-cover"
                  id="profile_img"
                  alt="profile_img"
                  width="384"
                  height="512"
                />
                <div className="px-2 py-2 font-bold">
                  <h1 className="text-xl">
                    {menteeDetails?.first_name} {menteeDetails?.last_name}
                  </h1>
                  <h1>{menteeDetails?.job_title}</h1>
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <blockquote>
                  <p className="text-lg">{myMentees?.goal_of_mentorship}</p>
                </blockquote>
                <figcaption>
                  <div className="flex justify-around">
                    <button
                      className="border-2 px-2 py-2 rounded-md bg-color-one text-white"
                      onClick={() => {
                        navigate(
                          `/mentor/my-mentees/paymentdetails/${myMentees?._id}/${profileImg}`
                        );
                      }}
                    >
                      Payment Details
                    </button>
                    <Link
                      to={"/chat"}
                      className="border-2 px-2 py-2 rounded-md bg-color-one text-white"
                    >
                      Message
                    </Link>
                  </div>
                </figcaption>
              </div>
            </figure>
          </div>
        )}
      </div>
    </>
  );
};

export default MyMentees;
