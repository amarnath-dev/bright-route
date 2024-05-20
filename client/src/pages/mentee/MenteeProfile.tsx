import { MenteeProfileCard } from "../../componets/MenteeProfileCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import "react-toastify/dist/ReactToastify.css";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NavBar from "../../componets/Navbar";
import NoImage from "../../assets/images/no-profile-image.png";
import Crop from "../../componets/Crop/Croper";
import "react-image-crop/dist/ReactCrop.css";
import Swal from "sweetalert2";
import { MenteeProfileSchema } from "../../validations/menteeProfileValidation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MenteeProfileTypes } from "../../interfaces/mentee.interface";

const MenteeProfile = () => {
  const { user } = useAppSelector((state) => state.userAuth);
  const axiosPrivate = useAxiosPrivate();
  const [goal, setGoal] = useState("");
  const [menteeEmail, setMenteeEmail] = useState<string>();
  const [profileImg, setProfileImg] = useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MenteeProfileTypes>({
    resolver: zodResolver(MenteeProfileSchema),
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/managment/${user?._id}`, {
          withCredentials: true,
        });
        const details = response.data?.menteeDetails[0];
        const profileDetails = details?.menteeProfile;
        setGoal(profileDetails?.goal);
        setProfileImg(profileDetails?.profile_img);
        setValue("profile_img", profileDetails?.profile_img);
        setValue("goal", details.menteeProfile?.goal);
        setValue("first_name", details.menteeProfile?.first_name);
        setValue("last_name", details.menteeProfile?.last_name);
        setValue("email", details?.email);
        setValue("job_title", details.menteeProfile?.job_title);
        setValue("linkedIn", details.menteeProfile?.linkedIn);
        setValue("twitter", details.menteeProfile?.twitter);
        setMenteeEmail(details?.email);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [axiosPrivate, user?._id, setValue]);

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

  const submitData = async (data: MenteeProfileTypes) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPrivate.post(
            "/managment/profie-update",
            data,
            {
              withCredentials: true,
            }
          );
          if (response) {
            const reqRes = response.data;
            if (reqRes.status === "success") {
              Swal.fire("Saved!", "", "success");
            }
          }
        } catch (error) {
          Swal.fire("Unable to save the changes", "", "error");
          console.log(error);
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      <NavBar />
      <div className="w-full h-full flex justify-center bg-background-two py-4">
        <div className="w-full md:w-2/3 h-full border border-gray-500 mt-10 rounded-md">
          <div className="w-full h-full flex justify-center flex-col">
            <h1 className="text-center mt-4 text-md md:text-lg font-bold text-white">
              Personal Information
            </h1>
            <MenteeProfileCard />
          </div>
          <div className="flex justify-between px-2">
            <div className="flex justify-center px-4 items-center">
              <Link
                to={"/managment/password"}
                className="text-blue-500 underline"
              >
                Change Password
              </Link>
            </div>
          </div>
          {goal ? (
            ""
          ) : (
            <div className="flex flex-col ml-6">
              <h1 className="font-bold text-white">Add a profile Image</h1>
            </div>
          )}
          <div className="px-2 md:px-5 md:py-2 flex items-center py-3">
            <div className="flex w-full flex-col items-center">
              <span className="flex items-center h-36 w-36 rounded-full overflow-hidden md:ml-4">
                <img
                  src={NoImage}
                  className="md:h-38 md:w-38 rounded-full object-cover"
                  id="profile-image"
                />
              </span>
              <div className="w-full flex justify-center items-center py-2">
                <Crop />
              </div>
            </div>
          </div>

          <div className="w-full px-3 md:px-0">
            <form onSubmit={handleSubmit(submitData)}>
              <div className="flex flex-col w-full md:flex-row justify-center text-gray-400">
                <label>
                  <span className="text-gray-400">First Name</span>
                  <input
                    id="first_name"
                    className="placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                    type="text"
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <small className="text-red-500 text-sm italic">
                      *{errors.first_name.message}
                    </small>
                  )}
                </label>
                <label className="mt-2 md:mt-0">
                  <span className="text-gray-400">Last name</span>
                  <input
                    id="last_name"
                    className="placeholder:text-black text-white field mt-1 block bg-gray-800 border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm"
                    type="text"
                    {...register("last_name")}
                  />
                  {errors.last_name && (
                    <small className="text-red-500 text-sm italic">
                      *{errors.last_name.message}
                    </small>
                  )}
                </label>
              </div>
              <div className="flex flex-col md:flex-row justify-center">
                <label className="mt-2">
                  <span className="text-gray-400">Email</span>
                  <input
                    id="email"
                    className="placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                    type="text"
                    disabled
                    value={menteeEmail}
                    {...register("email")}
                  />
                  {errors.email && (
                    <small className="text-red-500 text-sm italic">
                      *{errors.email.message}
                    </small>
                  )}
                </label>
                <label className="mt-2">
                  <span className="text-gray-400">Job Title</span>
                  <input
                    id="job_title"
                    className="placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm md:ml-3"
                    type="text"
                    {...register("job_title")}
                  />
                  {errors.job_title && (
                    <small className="text-red-500 text-sm italic">
                      *{errors.job_title.message}
                    </small>
                  )}
                </label>
              </div>
              <div className="flex flex-col md:flex-row justify-center">
                <label className="mt-2">
                  <span className="text-gray-400">LinkedIn</span>
                  <input
                    id="linkedIn"
                    className="placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                    type="text"
                    {...register("linkedIn")}
                  />
                  {errors.linkedIn && (
                    <small className="text-red-500 text-sm italic">
                      *{errors.linkedIn.message}
                    </small>
                  )}
                </label>
                <label className="mt-2">
                  <span className="text-gray-400">Twitter (Optional)</span>
                  <input
                    id="twitter"
                    className="placeholder:text-black field mt-1 block bg-gray-800 border-gray-800 text-white rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm"
                    type="text"
                    {...register("twitter")}
                  />
                  {errors.twitter && (
                    <small className="text-red-500 text-sm italic">
                      *{errors.twitter.message}
                    </small>
                  )}
                </label>
              </div>

              <div className="ml-1 md:ml-0 mr-2 md:mr-10 w-full md:px-9">
                <label
                  htmlFor="message"
                  className="block mt-4 mb-2 text-sm font-medium"
                ></label>
                <span className="text-gray-400">Goal</span>
                <textarea
                  id="goal"
                  rows={4}
                  className="placeholder:text-black field block mt-1 p-3 w-full text-sm bg-gray-800 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-dark-500 focus:ring-1"
                  {...register("goal")}
                ></textarea>
                {errors.goal && (
                  <small className="text-red-500 text-sm italic">
                    *{errors.goal.message}
                  </small>
                )}
                <h1 className="mt-2 text-sm text-white">
                  It's good practice to build mentorship around a long-term goal
                  of yours. This is shared with mentors.
                </h1>
              </div>
              <div className="flex md:justify-end justify-center py-4 md:px-9">
                <button
                  type="submit"
                  id="saveBtn"
                  className="px-2 py-2 md:px-2 md:py-2 rounded-md bg-color-five text-white mb-4"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenteeProfile;
