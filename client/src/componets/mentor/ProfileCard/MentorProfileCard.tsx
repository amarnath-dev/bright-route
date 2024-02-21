import PublicIcon from "@mui/icons-material/Public";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { useEffect } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../app/firebase";
import { useNavigate } from "react-router-dom";

export const MentorProfileCard = ({ mentor, user }) => {
  const navigate = useNavigate();
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

      {user === "mentor" ? (
        <div className="text-center mt-5 mb-5 md:mb-0 md:mt-9">
          <button
            className="ml-4 mb-8"
            onClick={() => navigate("/mentor/profile/update")}
          >
            Update
          </button>
        </div>
      ) : (
        <div className="mb-10"></div>
      )}
    </div>
  );
};
