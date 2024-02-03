import React, { useEffect, useState } from "react";
import { mentorProfileObj } from "../../datatypes/Datatypes";
import API from "../../api";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../app/firebase";

const MentorProfil: React.FC = () => {
  const [mentor, setMentor] = useState<mentorProfileObj>();

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await API.get("/mentor/profile", {
          withCredentials: true,
        });
        if (response.data) {
          const mentor = response.data;
          console.log("this is mentor datails", mentor.mentorDetails);
          setMentor(mentor.mentorDetails[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMentorData();
  }, []);

  //fetching img from firebase
  useEffect(() => {
    const imageId = mentor?.profile_img;
    //if check for avoiding root error
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

  return (
    <>
      <div className="w-screen h-screen flex-row md:flex md:items-center md:flex-col">
        <div className="w-full ml-1 mr-1 md:ml-0 md:mr-0 md:w-1/2 md:h-40 mt-10 rounded-lg flex flex-row border-2">
          <div className="w-40 h-full flex justify-center items-center shadow-lg flex-col px-2 py-2">
            <img
              alt="profile_img"
              className="mt-2 w-16 h-16 border-2 md:mt-0 md:w-24 md:h-24 rounded-full ml-2"
              id="profile_img"
            />
            <button className="w-14 h-6 ml-2 mb-4 md:mb-0 md:w-full text-sm rounded-md md:h-8 mt-2 md:ml-1 bg-slate-200 md:px-1 md:py-1">
              Change
            </button>
          </div>

          <div className="w-full mt-2 md:px-10 md:py-4">
            <h1 className="text-md md:text-xl font-bold mt-3 md:mt-0">
              {mentor?.first_name} {mentor?.last_name}
            </h1>
            <h2 className="md:mt-2 md:font-bold">{mentor?.job_title}</h2>
            <h2 className="md:mt-2 md:font-bold">{mentor?.mentorEmail}</h2>
          </div>
        </div>

        <div className="w-full md:w-2/3 h-screen mt-2 rounded-lg border-2">
          <div className="flex flex-col items-center md:flex-row md:justify-between px-2 py-2">
            <label>
              <h1>First name</h1>
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="md:mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block md:mt-1 w-80 md:w-64 p-2.5 cursor-not-allowed"
                value={mentor?.first_name}
                disabled
              />
            </label>
            <label>
              <h1>Last name</h1>
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="md:mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block md:mt-1 w-80 md:w-64 p-2.5 cursor-not-allowed"
                value={mentor?.last_name}
                disabled
              />
            </label>
            <label>
              <h1>Email</h1>
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="md:mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block mt-1 w-80 md:w-64 p-2.5 cursor-not-allowed"
                value={mentor?.mentorEmail}
                disabled
              />
            </label>
          </div>

          <div className="flex flex-col md:flex-row px-2 py-2 items-center md:justify-between">
            <label>
              <h1>Company Name</h1>
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block mt-1 w-80 md:w-64 p-2.5 cursor-not-allowed"
                value={mentor?.company}
                disabled
              />
            </label>
            <label>
              <h1>LinkedIn</h1>
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block mt-1  w-80 md:w-64 p-2.5 cursor-not-allowed"
                value={mentor?.linkedIn}
                disabled
              />
            </label>
            <label>
              <h1>Twitter</h1>
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block mt-1  w-80 md:w-64 p-2.5 cursor-not-allowed"
                value={mentor?.twitter}
                disabled
              />
            </label>
          </div>

          <div className="flex flex-row px-2 py-2 justify-between">
            <label>
              <h1>Personal Website</h1>
              <input
                type="text"
                id="disabled-input"
                aria-label="disabled input"
                className="mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block mt-1 w-80 md:w-96 p-2.5 cursor-not-allowed"
                value={mentor?.web_url}
                disabled
              />
            </label>
          </div>
          <div className="flex justify-end mt-5 md:mt-0">
            <button
              type="button"
              className="text-gray-90 border border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-color-one text-white"
            >
              Update
            </button>
          </div>
        </div>

        <div className="mt-12 md:w-2/3 h-screen md:mt-2 rounded-lg border-2 px-3 py-3">
          <h1>Bio</h1>
          <p
            id="disabled-input"
            aria-label="disabled input"
            className="mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block mt-1 w-full p-2.5 cursor-not-allowed h-auto"
          >
            {mentor?.bio}
          </p>
          <h1>Skills</h1>
          <p
            id="disabled-input"
            aria-label="disabled input"
            className="mb-6 bg-gray-100 border border-gray-300 text-sm rounded-lg block mt-1 w-full p-2.5 cursor-not-allowed h-auto"
          >
            {mentor?.skills}
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-gray-90 border border-gray-300 font-medium rounded-md text-sm px-2 py-1 md:px-5 md:py-2.5 md:me-2 md:mb-2 bg-color-one text-white"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorProfil;
