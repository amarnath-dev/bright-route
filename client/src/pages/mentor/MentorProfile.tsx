import PublicIcon from "@mui/icons-material/Public";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { useEffect, useState } from "react";
import { mentorProfileObj } from "../../datatypes/Datatypes";
import API from "../../api";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../app/firebase";
import { useNavigate } from "react-router-dom";

export const MentorProfile = () => {
  const [mentor, setMentor] = useState<mentorProfileObj>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await API.get("/mentor/profile", {
          withCredentials: true,
        });
        if (response.data) {
          setMentor(response.data.mentorDetails);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMentorData();
  }, []);

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

  return (
    <>
      <div className="h-full grid grid-cols-12 bg-slate-200">
        <div className="col-span-12  md:col-span-4 px-10 py-10">
          <div className="rounded-md shadow-lg border-2 bg-white">
            <div className="flex justify-center">
              <img
                alt="mentor_image"
                id="profile_img"
                className="w-32 md:w-40 h-auto rounded-full px-2 py-2 mt-2 border-2"
              />
            </div>
            <div className="flex justify-center">
              <h1 className="font-bold text-xl py-2">
                {mentor?.first_name} {mentor?.last_name}
              </h1>
            </div>
            <div className="flex justify-center">
              <h1 className="text-md font-bold">{mentor?.job_title}</h1>
            </div>
            <div className="flex justify-center">
              <h1 className="text-md py-2">{mentor?.mentorEmail[0]?.email}</h1>
            </div>
            <div className="text-center">
              <h1 className="underline">{mentor?.company}</h1>
            </div>
            <div className="text-center">
              <h1 className="mt-3 text-sm">
                <PublicIcon className="font-sm" />
                {mentor?.state}
              </h1>
            </div>
            <div className="text-center mt-4 md:mt-8 mb-5 md:mb-0">
              <a href={mentor?.twitter} target="_blank">
                <XIcon className="cursor-pointer" />
              </a>
              <a className="ml-10" href={mentor?.linkedIn}>
                <LinkedInIcon className="cursor-pointer" />
              </a>
            </div>
            <div className="text-center mt-5 mb-5 md:mb-0 md:mt-9">
              {/* <button className="md:mb-10">Log Out</button> */}
              <button
                className="ml-4 mb-8"
                onClick={() => navigate("/mentor/profile/update")}
              >
                Update
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8 md:px-10 md:py-10">
          <div className="md:h-full py-5 md:px-8 md:py-8 rounded-md">
            <div className="px-2 md:px-0">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium"
              >
                ABOUT ME
              </label>
              <textarea
                id="bio"
                rows={12}
                disabled
                defaultValue={mentor?.bio}
                className="block p-2.5 w-full text-lg rounded-lg focus:border-gray text-black bg-white"
              ></textarea>
            </div>

            <div className="mt-5 rounded-md px-2 py-2 border-2">
              <h1 className="block mb-2 text-lg font-medium">Skills</h1>
              <div className="mt-3 h-full flex-wrap">
                {mentor?.skills.map((skill, index) => {
                  return (
                    <span
                      key={index}
                      className="rounded-full bg-blue-200 px-6 py-1 ml-2"
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
