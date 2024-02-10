import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { MenteeProfileCard } from "../../componets/mentee/MenteeProfileCard";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import API from "../../api";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const MenteeProfile = () => {
  const [mentee, setMentee] = useState();
  const [stateChange, setStateChange] = useState(false);
  const { user } = useAppSelector((state) => state.userAuth);
  // const [formData, setFormdata] = useState({
  //   profile_img: "",
  //   first_name: "",
  //   last_name: "",
  //   email: "",
  //   location: "",
  //   job_title: "",
  //   linkedIn: "",
  //   twitter: "",
  //   goal: "",
  // });

  const changeState = () => {
    setStateChange(true);
    document.getElementById("first_name").removeAttribute("disabled");
    document.getElementById("last_name").removeAttribute("disabled");
    document.getElementById("email").removeAttribute("disabled");
    document.getElementById("location").removeAttribute("disabled");
    document.getElementById("job_title").removeAttribute("disabled");
    document.getElementById("linkedIn").removeAttribute("disabled");
    document.getElementById("twitter").removeAttribute("disabled");
    document.getElementById("goal").removeAttribute("disabled");
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await API.get(`/managment/${user._id}`, {
          withCredentials: true,
        });
        const details = response.data;
        setMentee(details.mentorDetails[0]);
      } catch (error) {
        console.log("User Data fetch failed");
      }
    };
    fetchDetails();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted", e);
  };

  return (
    <>
      <div className="w-screen h-full flex justify-center mb-28">
        <div className="w-full md:w-2/3 h-full border-2 mt-10 rounded-md">
          <div className="w-full h-full flex justify-center flex-col">
            <h1 className="text-center mt-4 text-md md:text-lg font-bold">
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
            <div className="px-1">
              <button
                className="rounded-full px-2 py-2 flex justify-center items-center"
                onClick={changeState}
              >
                <Button
                  variant="outlined"
                  style={{ border: "1px black solid" }}
                >
                  <h1 className="text-black">Edit</h1>
                  <EditIcon className="px-1 text-black" />
                </Button>
              </button>
            </div>
          </div>

          {mentee?.profile_img ? (
            ""
          ) : (
            <div className="flex flex-col ml-6">
              <h1 className="font-bold">Add a profile Image</h1>
            </div>
          )}
          <div className="px-2 md:px-5 md:py-2 flex items-center">
            <div className="flex w-full flex-row items-center">
              <span className="flex items-center h-36 w-36 rounded-full overflow-hidden md:ml-4">
                <img
                  src={
                    mentee?.profile_img
                      ? ""
                      : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"
                  }
                  alt="profile_img"
                  className="md:h-20 md:w-20 rounded-full"
                />
              </span>

              <div className="px-6 md:px-0 w-full">
                {stateChange === true ? (
                  <Button
                    id="img_btn"
                    style={{
                      background: "white",
                      color: "black",
                      border: "1px solid black",
                    }}
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Photo
                    <VisuallyHiddenInput type="file" />
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full px-3 md:px-0">
            <div className="flex flex-col w-full md:flex-row justify-center">
              <label>
                First name
                <input
                  id="first_name"
                  className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                  type="text"
                  placeholder={mentee?.first_name}
                  disabled
                />
              </label>

              <label className="mt-2 md:mt-0">
                Last name
                <input
                  id="last_name"
                  className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm"
                  type="text"
                  placeholder={mentee?.last_name}
                  disabled
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
                  placeholder={mentee?.mentorInfo?.email}
                  disabled
                />
                <h1>Only visible to you</h1>
              </label>
              <label className="mt-2">
                Location
                <input
                  id="location"
                  className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm"
                  type="text"
                  placeholder={mentee?.profile ? mentee?.profile : "---------"}
                  disabled
                />
              </label>
            </div>

            <div className="flex justify-center mt-3 flex-col md:mr-10 w-full md:px-9">
              <h1>Job Title</h1>
              <input
                id="job_title"
                className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-full sm:text-sm"
                type="text"
                placeholder={
                  mentee?.job_title ? mentee?.job_title : "---------"
                }
                disabled
              />
            </div>

            <div className="flex flex-col md:flex-row justify-center">
              <label className="mt-2">
                LinkedIn
                <input
                  id="linkedIn"
                  className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 sm:text-sm"
                  type="text"
                  placeholder={
                    mentee?.linkedIn ? mentee?.linkedIn : "---------"
                  }
                  disabled
                />
              </label>
              <label className="mt-2">
                Twitter
                <input
                  id="twitter"
                  className="placeholder:text-black field mt-1 block bg-white border border-slate-300 rounded-md py-3 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 focus:ring-dark-500 focus:ring-1 w-full md:w-96 md:ml-2 sm:text-sm"
                  type="text"
                  placeholder={mentee?.twitter ? mentee?.twitter : "---------"}
                  disabled
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
                rows="4"
                placeholder={
                  mentee?.goal
                    ? mentee?.goal
                    : "<----------- Please add your Goal -------------->"
                }
                disabled
                className="placeholder:text-black field block mt-1 p-3 w-full text-sm bg-gray-50 rounded-lg border-2 focus:outline-none focus:ring-dark-500 focus:ring-1"
              ></textarea>
              <h1 className="mt-2 text-sm">
                It's good practice to build mentorship around a long-term goal
                of yours. This is shared with mentors.
              </h1>
            </div>

            <div className="mt-5 flex md:justify-end justify-center md:px-9">
              {stateChange == true ? (
                <button
                  type="submit"
                  id="saveBtn"
                  // disabled
                  className="border-2 px-1 py-1 md:px-2 md:py-2 rounded-md bg-color-one text-white mb-4"
                >
                  Save Changes
                </button>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
