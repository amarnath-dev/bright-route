import PublicIcon from "@mui/icons-material/Public";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../app/firebase";
import { useNavigate } from "react-router-dom";
import { mentorProfileObj } from "../../../datatypes/Datatypes";


interface MentorProfileCardProps {
  mentor: mentorProfileObj | undefined;
  user: string;
}

const MentorProfileCard: React.FC<MentorProfileCardProps> = ({
  mentor,
  user,
}) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  useEffect(() => {
    const imageId = mentor?.profile_img;
    if (imageId) {
      const imageRef = ref(storage, imageId);
      getDownloadURL(imageRef)
        .then((url) => {
          // const img = document.getElementById(
          //   "profile_img"
          // ) as HTMLImageElement;
          // img.src = url;
          setProfileImage(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [mentor]);

  return (
    <div className="rounded-md shadow-lg border border-gray-500 bg-background-two">
      <div className="flex justify-center py-5">
        <img
          alt="mentor_image"
          id="profile_img"
          src={
            profileImage
              ? profileImage
              : "https://www.menusltd.com/image/avatar.jpeg"
          }
          className="w-28 md:w-36 h-auto rounded-full px-2 py-2 border border-gray-400 object-cover"
        />
      </div>
      <div className="flex justify-center">
        <h1 className="font-bold text-xl py-1 text-gray-400">
          {mentor?.first_name} {mentor?.last_name}
        </h1>
      </div>
      <div className="flex justify-center">
        <h1 className="text-md font-bold text-gray-400">{mentor?.job_title}</h1>
      </div>
      <div className="flex justify-center">
        <h1 className="text-md py-2 text-gray-400">{mentor?.mentorEmail}</h1>
      </div>
      <div className="text-center">
        <h1 className="underline text-gray-400">{mentor?.company}</h1>
      </div>
      <div className="text-center">
        <h1 className="mt-3 text-sm text-gray-400">
          <PublicIcon className="font-sm" />
          {mentor?.state}
        </h1>
      </div>
      <div className="text-center mt-4 md:mt-8 mb-5 md:mb-0">
        <a href={mentor?.twitter} target="_blank">
          <XIcon className="cursor-pointer text-gray-400" />
        </a>
        <a className="ml-10" href={mentor?.linkedIn}>
          <LinkedInIcon className="cursor-pointer text-gray-400" />
        </a>
      </div>
      {user === "mentor" ? (
        <div className="text-center mt-5 mb-5 md:mb-0 md:mt-9">
          <button
            className="ml-4 mb-8 text-gray-400"
            onClick={() => navigate("/mentor/profile/update")}
          >
            Update
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <div className="px-5">
            <button
              className="bg-gray-800 w-full px-1 py-2 rounded-full md:mt-5 mb-5 text-gray-300"
              onClick={() => navigate(`/chat/${mentor?.mentor_id}`)}
            >
              Message Mentor
            </button>
          </div>
          <div className="px-5 text-start">
            <small className="w-full font-bold text-gray-400">
              You can message {mentor?.first_name} to ask questions before
              booking their services.
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorProfileCard;
