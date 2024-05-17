import "react-toastify/dist/ReactToastify.css";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "react-image-crop/dist/ReactCrop.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MenteeProfileDetails } from "../../interfaces/mentee.interface";

const MenteeProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const { menteeId } = useParams();
  const [menteeDetails, setMenteeDetails] =
    useState<MenteeProfileDetails | null>(null);
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/managment/${menteeId}`, {
          withCredentials: true,
        });
        setMenteeDetails(response.data.menteeDetails);
        setProfileImg(response.data?.menteeDetails?.profile_img);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [axiosPrivate, menteeId]);

  useEffect(() => {
    if (profileImg) {
      const fetchImg = async () => {
        const imageId = profileImg;
        if (imageId) {
          const imageRef = ref(storage, imageId);
          getDownloadURL(imageRef)
            .then((url) => {
              const img = document.getElementById(
                "profile-image"
              ) as HTMLImageElement;
              img.src = url;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };
      fetchImg();
    }
  }, [profileImg]);

  return (
    <>
      <div className="w-full h-full flex justify-center mb-28 mt-10">
        <div className="w-full md:w-2/3 h-full border-2 mt-10 rounded-md">
          <div className="w-full h-full flex justify-center flex-col"></div>
          <div className="flex justify-between px-2"></div>
          <div className="px-2 md:px-5 md:py-2 flex items-center">
            <div className="flex w-full flex-row items-center">
              <span className="flex items-center h-36 w-36 rounded-full overflow-hidden md:ml-4">
                <img
                  src={
                    profileImg
                      ? ""
                      : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"
                  }
                  alt="profile_img"
                  className="md:h-28 md:w-28 rounded-full object-cover border-2"
                  id="profile-image"
                />
              </span>
            </div>
          </div>

          <form className="w-full px-3 md:px-0">
            <div className="flex flex-col w-full md:flex-row justify-center">
              <label>
                First name
                <input
                  id="first_name"
                  className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                  type="text"
                  name="first_name"
                  disabled
                  value={menteeDetails?.first_name}
                />
              </label>
              <label className="mt-2 md:mt-0">
                Last name
                <input
                  id="last_name"
                  className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm"
                  type="text"
                  name="last_name"
                  disabled
                  value={menteeDetails?.last_name}
                />
              </label>
            </div>
            <div className="flex flex-col md:flex-row justify-center">
              <label className="mt-2">
                Email
                <input
                  id="email"
                  className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                  type="text"
                  name="email"
                  disabled
                  value={menteeDetails?.email}
                />
              </label>
              <label className="mt-2">
                Job Title
                <input
                  id="job_title"
                  className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm md:ml-3"
                  type="text"
                  name="job_title"
                  disabled
                  value={menteeDetails?.job_title}
                />
              </label>
            </div>

            <div className="ml-1 md:ml-0 mr-2 md:mr-10 w-full md:px-9">
              <label
                htmlFor="message"
                className="block mt-4 mb-2 text-sm font-medium"
              ></label>
              Goal
              <textarea
                id="goal"
                rows={4}
                name="goal"
                disabled
                value={menteeDetails?.goal}
                className="placeholder:text-black field block mt-1 p-3 w-full text-sm bg-gray-50 rounded-lg border-2 focus:outline-none focus:ring-dark-500 focus:ring-1"
              ></textarea>
            </div>
            <div className="mt-5 flex md:justify-end justify-center md:px-9"></div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MenteeProfile;
