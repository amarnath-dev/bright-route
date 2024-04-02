import { MenteeProfileCard } from "../../componets/mentee/MenteeProfileCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import "react-toastify/dist/ReactToastify.css";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../app/firebase";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import NavBar from "../../componets/navbar/Navbar";
import NoImage from "../../assets/no-profile-image.png";
import Crop from "../../componets/ImageCrop/Croper";
import "react-image-crop/dist/ReactCrop.css";
import Swal from "sweetalert2";

const MenteeProfile = () => {
  const { user } = useAppSelector((state) => state.userAuth);
  const axiosPrivate = useAxiosPrivate();
  const [goal, setGoal] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_profileImg, setProfileImg] = useState("");

  const [menteeEmail, setMenteeEmail] = useState<string>("");
  const [formData, setFormdata] = useState({
    profile_img: "",
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    job_title: "",
    linkedIn: "",
    twitter: "",
    goal: "",
  });

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axiosPrivate.get(`/managment/${user?._id}`, {
          withCredentials: true,
        });
        const details = response.data.menteeDetails[0];
        setGoal(details.menteeProfile?.goal);
        setProfileImg(details.menteeProfile?.profile_img);
        setFormdata(details.menteeProfile);
        setMenteeEmail(details?.email);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [axiosPrivate, user?._id]);

  if (formData.profile_img) {
    const fetchImg = async () => {
      const imageId = formData.profile_img;
      //if check for avoiding root error
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        formData.goal = goal;
        try {
          const response = await axiosPrivate.post(
            "/managment/profie-update",
            formData,
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
          {formData?.profile_img ? (
            ""
          ) : (
            <div className="flex flex-col ml-6">
              <h1 className="font-bold text-white">
                Please Add a profile Image
              </h1>
            </div>
          )}
          <div className="px-2 md:px-5 md:py-2 flex items-center py-3">
            <div className="flex w-full flex-col items-center">
              <span className="flex items-center h-36 w-36 rounded-full overflow-hidden md:ml-4">
                <img
                  src={NoImage}
                  alt="profile_img"
                  className="md:h-38 md:w-38 rounded-full object-cover"
                  id="profile-image"
                />
              </span>
              <div className="w-full flex justify-center items-center py-2">
                <Crop />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full px-3 md:px-0">
            <div className="flex flex-col w-full md:flex-row justify-center text-gray-400">
              <label>
                <span className="text-gray-400">First Name</span>
                <input
                  id="first_name"
                  className="placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                  type="text"
                  name="first_name"
                  onChange={onchange}
                  value={formData.first_name}
                />
              </label>
              <label className="mt-2 md:mt-0">
                <span className="text-gray-400">Last name</span>
                <input
                  id="last_name"
                  className="placeholder:text-black text-white field mt-1 block bg-gray-800 border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm"
                  type="text"
                  name="last_name"
                  value={formData?.last_name}
                  onChange={onchange}
                />
              </label>
            </div>
            <div className="flex flex-col md:flex-row justify-center">
              <label className="mt-2">
                <span className="text-gray-400">Email</span>
                <input
                  id="email"
                  className="placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                  type="text"
                  name="email"
                  disabled
                  value={menteeEmail}
                  onChange={onchange}
                />
              </label>
              <label className="mt-2">
                <span className="text-gray-400">Job Title</span>
                <input
                  id="job_title"
                  className="placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm md:ml-3"
                  type="text"
                  name="job_title"
                  value={formData.job_title}
                  onChange={onchange}
                />
              </label>
            </div>
            <div className="flex flex-col md:flex-row justify-center">
              <label className="mt-2">
                <span className="text-gray-400">LinkedIn</span>
                <input
                  id="linkedIn"
                  className="placeholder:text-black field mt-1 block bg-gray-800 text-white border-gray-800 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                  type="text"
                  name="linkedIn"
                  onChange={onchange}
                  value={formData.linkedIn}
                />
              </label>
              <label className="mt-2">
                <span className="text-gray-400">Twitter</span>
                <input
                  id="twitter"
                  className="placeholder:text-black field mt-1 block bg-gray-800 border-gray-800 text-white rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm"
                  type="text"
                  name="twitter"
                  value={formData.twitter}
                  onChange={onchange}
                />
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
                name="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="placeholder:text-black field block mt-1 p-3 w-full text-sm bg-gray-800 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-dark-500 focus:ring-1"
              ></textarea>
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
    </>
  );
};

export default MenteeProfile;
