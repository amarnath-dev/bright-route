import React, { useEffect, useState } from "react";
import { mentorProfileObj } from "../../datatypes/Datatypes";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../app/firebase";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import NavBar from "../../componets/navbar/Navbar";
import "react-image-crop/dist/ReactCrop.css";
import "react-toastify/dist/ReactToastify.css";
import Croper from "../../componets/ImageCrop/Croper";
import NoImage from "../../assets/no-profile-image.png";

const MentorProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const [mentor, setMentor] = useState<mentorProfileObj>();
  const [defaultSkills, setDefaultSkills] = useState<{ title: string }[]>([]);
  const axiosPrivate = useAxiosPrivate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [closeCrop, seCloseCrop] = useState(false);

  const [mentorData, setMentorData] = useState({
    first_name: "",
    last_name: "",
    mentorEmail: "",
    company: "",
    linkedIn: "",
    twitter: "",
    web_url: "",
    job_title: "",
    bio: "",
    category: "",
    state: "",
  });

  const handleAutoCompleteChange = (
    _event: React.SyntheticEvent,
    value: { title: string }[]
  ) => {
    setDefaultSkills(value);
  };

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await axiosPrivate.get("/mentor/profile", {
          withCredentials: true,
        });
        if (response.data) {
          const mentorDetails = response.data.mentorDetails;
          setMentor(mentorDetails);
          const skillValues = mentorDetails.skills;
          const topSkills = skillValues.map((skill: string) => ({
            title: skill,
          }));
          setDefaultSkills(topSkills);
          setMentorData(mentorDetails);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMentorData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeCrop]);

  useEffect(() => {
    const imageId = mentor?.profile_img;
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
  }, [mentor]);

  const handleSubmit = async () => {
    try {
      console.log("Button Clicked");
      const response = await axiosPrivate.post(
        "/mentor/profile/update",
        { mentorData, defaultSkills },
        {
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        toast(response.data.message);
        setTimeout(function () {
          navigate("/mentor/profile");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setMentorData({
      ...mentorData,
      [name]: value,
    });
  };

  return (
    <>
      <NavBar />
      <ToastContainer className="w-40 md:w-80" />
      <div className="w-full h-full flex-row md:flex md:items-center md:flex-col bg-background-two text-white">
        <div className="w-full md:mt-10 rounded-lg flex flex-row">
          <div className="w-full h-full flex justify-center items-center flex-col px-2 py-2">
            <img
              alt="profile_img"
              className="w-36 h-36 rounded-full object-cover"
              id="profile_img"
              src={NoImage}
            />
            <div className="py-3">
              <Croper />
            </div>
          </div>
        </div>

        <div className="w-full h-full md:w-2/3 mt-2 rounded-lg mb-72 md:mb-3 bg-background-two">
          <div className="flex flex-col items-center md:flex-row md:justify-between px-2 py-2">
            <label>
              <h1 className="text-gray-400">First Name</h1>
              <input
                type="text"
                id="first_name"
                name="first_name"
                className="md:mb-6 bg-gray-800 border-gray-800 text-sm rounded-lg block mt-2 md:mt-1 w-80 md:w-64 p-2.5"
                value={mentorData?.first_name}
                onChange={handleInputChange}
              />
            </label>
            <label className="mt-2">
              <h1 className="text-gray-400">Last Name</h1>
              <input
                type="text"
                id="last_name"
                name="last_name"
                className="md:mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block mt-2 md:mt-1 w-80 md:w-64 p-2.5"
                value={mentorData?.last_name}
                onChange={handleInputChange}
              />
            </label>
            <label className="mt-2">
              <h1 className="text-gray-400">Email</h1>
              <input
                type="text"
                id="email"
                name="mentorEmail"
                className="md:mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block mt-2 w-80 md:w-64 p-2.5"
                value={mentorData?.mentorEmail}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="flex flex-col md:flex-row px-2 py-2 items-center md:justify-between">
            <label>
              <h1 className="text-gray-400">Company</h1>
              <input
                type="text"
                id="company"
                name="company"
                className="mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block mt-1 w-80 md:w-64 p-2.5"
                value={mentorData?.company}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <h1 className="text-gray-400">LinkedIn</h1>
              <input
                type="text"
                id="linkedIn"
                name="linkedIn"
                className="mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block w-80 md:w-64 p-2.5"
                value={mentorData?.linkedIn}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <h1 className="text-gray-400">Twitter</h1>
              <input
                type="text"
                id="twitter"
                name="twitter"
                className="mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block w-80 md:w-64 p-2.5"
                value={mentorData?.twitter}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="flex flex-col md:flex-row md:px-2 md:py-2 items-center">
            <label>
              <h1 className="text-gray-400">Personal Website</h1>
              <input
                type="text"
                id="personal_web"
                name="web_url"
                className="mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block w-80 md:w-64 p-2.5"
                value={mentorData?.web_url}
                onChange={handleInputChange}
              />
            </label>
            <label className="md:ml-8">
              <h1 className="text-gray-400">Job Title</h1>
              <input
                type="text"
                id="job_title"
                name="job_title"
                className="mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block w-80 md:w-64 p-2.5"
                value={mentorData?.job_title}
                onChange={handleInputChange}
              />
            </label>
            <label className="md:ml-8">
              <h1 className="text-gray-400">State</h1>
              <input
                type="text"
                id="state"
                name="state"
                className="mb-6 bg-gray-800 border border-gray-800 text-sm rounded-lg block w-80 md:w-64 p-2.5"
                value={mentorData?.state}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className="flex flex-col md:flex-row md:px-2 md:py-2 items-center">
            <label>
              <h1 className="font-bold ">Select Category</h1>
              <select
                name="category"
                id="category"
                value={mentorData?.category}
                onChange={handleInputChange}
                className="placeholder:text-slate-400 bg-gray-800 block border border-gray-800 rounded-md mt-1 py-2 pl-9 pr-3 shadow-md focus:outline-none focus:border-dark-500 w-80 md:w-96 sm:text-sm"
              >
                <option value="null">-------</option>
                <option value="Software Development">
                  Software Development
                </option>
                <option value="Engineering & Data">Engineering & Data</option>
                <option value="UI & UX Design">UI & UX Design</option>
                <option value="Bussiness & Managment">
                  Bussiness & Managment
                </option>
                <option value="Product & Marketing">Product & Marketing</option>
              </select>
            </label>
          </div>
        </div>

        <div className="md:w-2/3 md:mt-10 rounded-lg border px-2 py-2">
          <div className="px-2 md:px-0">
            <label htmlFor="message" className="block py-2 text-sm font-medium">
              ABOUT ME
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={10}
              defaultValue={mentorData?.bio}
              onChange={handleInputChange}
              className="block p-2.5 w-full text-lg rounded-lg focus:border-gray-800 bg-gray-800 text-white"
            ></textarea>
          </div>
          <h1 className="py-2 font-bold">Update your Skills</h1>
          <div className="px-1 py-1 bg-gray-300 rounded-md">
            <Stack spacing={3} className="text-gray-400">
              <Autocomplete
                multiple
                id="tags-standard"
                options={topSkills}
                getOptionLabel={(option) => option?.title}
                value={defaultSkills}
                onChange={handleAutoCompleteChange}
                filterOptions={(options, { inputValue }) =>
                  options.filter((option) =>
                    option.title
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  )
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    className="placeholder:text-white"
                  />
                )}
              />
            </Stack>
            <div className="flex justify-end py-4">
              <button
                type="button"
                className="text-gray-90 font-medium rounded-lg text-sm px-5 py-2.5 me-2 bg-color-five text-white"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorProfileEdit;

const topSkills = [
  { title: "Node js" },
  { title: "React" },
  { title: "HTML" },
  { title: "Typescript" },
  { title: "Mongodb" },
  { title: "Python" },
  { title: "Java" },
  { title: "Javascript" },
  { title: "Ruby" },
  { title: "Fortran" },
];
